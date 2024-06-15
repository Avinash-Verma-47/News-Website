import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function NewsList({ news, setIsSearching, isSearching,currentPage, totalPages, handlePageChange }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');

  // const summarizeArticle = async (url) => {
  //   setLoading(true);
  //   try {
  //   console.log(url);

  //     const response = await axios.post('http://localhost:5000/api/summarize', {url});
  //     setSummary(response.data.summary);
  //   } catch (error) {
  //     alert('Error summarizing article');
  //   }
  //   setLoading(false);
  // };

  const summarizeArticle= async (url) =>{
    try{
    const options = {
      method: 'POST',
      url: 'https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/',
      headers: {
        'x-rapidapi-key': 'd501da5d11msh898f64aad4acdc2p1ad34djsn8fb382759087',
        'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        url: url,
        min_length: 100,
        max_length: 300,
        is_detailed: true
      }
    };
    
      const response = await axios.request(options);
      console.log(response.data.summary);
      setSummary(response.data.summary);
      setShowSummaryModal(true);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleSaveNote = async () => {
    // Logic to save the summary as a note
    // Example: You can call a function to save the summary to the backend
    try {
      const token = localStorage.getItem('token');
      const title=noteTitle;
      const content=summary;
      const response = await axios.post('http://localhost:5000/api/notes', { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    setShowSummaryModal(false);
    } catch (error) {
      alert('Error adding note');
    }
    finally{
    setNoteTitle('');
    }
  };


  const currentNews= isSearching?news:topHeadlines;

  const filteredNews= currentNews?.filter(article=>article.title!="[Removed]"  || article.urlToImage!=null);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNews?.map((article, index) => (
          <div key={index} className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden mb-4">
            <div className="p-6 flex-1">
              <h5 className="text-xl font-semibold mb-2">{article.title}</h5>
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="mb-4 rounded-md" />}
              <p className="text-gray-700 mb-4">{article.description}</p>
            </div>
            <div className="p-6">
              <a href={article.url} className="bg-blue-500 text-white py-2 px-4 rounded inline-block mt-2 mr-2 hover:bg-blue-600" target="_blank" rel="noopener noreferrer">Read More</a>
              <button className="bg-gray-500 text-white py-2 px-4 rounded inline-block mt-2 hover:bg-gray-600" onClick={() => summarizeArticle(article.url)}>Summarize</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600 disabled:opacity-50">Previous</button>
        <span className="text-gray-700 py-2 px-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-gray-500 text-white py-2 px-4 rounded ml-2 hover:bg-gray-600 disabled:opacity-50">Next</button>
      </div>
      {showSummaryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <input
              type="text"
              placeholder="Enter title for the note"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <p className="text-gray-700 mb-4">{summary}</p>
            <div className="flex justify-between">
              <button onClick={handleSaveNote} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save as Note</button>
              <button onClick={() => setShowSummaryModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsList;
