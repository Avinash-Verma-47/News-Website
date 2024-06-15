import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', { username, email, password });
      alert('User registered successfully');
      window.location.href = '/'; 
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundColor: '#374151', // Change this color to match your navbar color
      }}
    >
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
        >
          Register
        </button>
        <p className="text-center text-gray-700">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
