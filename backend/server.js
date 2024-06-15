const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});


app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User registered successfully' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(400).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/notes', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  db.query('INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: result.insertId, title, content });
  });
});

app.get('/api/notes', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM notes WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(results);
  });
});

app.put('/api/notes/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
  
    db.query('UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, id, userId], (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Note not found' });
      res.json({ message: 'Note updated successfully' });
    });
  });
  
  
  app.delete('/api/notes/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    db.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [id, userId], (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Note not found' });
      res.json({ message: 'Note deleted successfully' });
    });
  });

app.get('/api/news', async (req, res) => {
  try {
    const topic = req.query.topic || 'general';
    const page= req.query.page;
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: topic,
        language:'en',
        pageSize:'21',
        page: page,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/top-headlines', async (req, res) => {
    try {
      const page= req.query.page;
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          country:'in',
          pageSize:'21',
          page: page,
          apiKey: process.env.NEWS_API_KEY,
        },
      });
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/category', async (req, res) => {
    try {
        const category= req.query.category;
        const page= req.query.page;
        const country=req.query.country;
      const response = await axios.get(`https://newsapi.org/v2/top-headlines/`, {
        params: {
          category:category,
          pageSize:'21',
          country:country,
          page:page,
          apiKey: process.env.NEWS_API_KEY,
        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // app.post('api/summarize', async (req, res) =>{
  //   try {

  //   const {url} = req.body;
  //   console.log('bro');

  //   const options = {
  //     method: 'POST',
  //     url: 'https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/',
  //     headers: {
  //       'x-rapidapi-key': process.env.RAPID_API_KEY,
  //       'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
  //       'Content-Type': 'application/json'
  //     },
  //     data: {
  //       url: url,
  //       min_length: 100,
  //       max_length: 300,
  //       is_detailed: false
  //     }
  //   };
    
  //     const response = await axios.request(options);
  //     console.log(response.data.summary);
  //     res.json(response.data.summary);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: error.message });
  //   }
  // });

  app.get('/api/me', authenticateToken, (req, res) => {
    console.log("me");
    db.query('SELECT * FROM users WHERE id = ?', [req.user.id], async (err, results) => {
      if (err) return res.status(400).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });
       const user= results[0];
        console.log(user);
    if (!user) return res.sendStatus(404);
    res.json({ user: {id: user.id, email: user.email, password:user.password}});
  
    })
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
