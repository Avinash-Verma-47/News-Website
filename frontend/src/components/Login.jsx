import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      alert('User logged in successfully');
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundColor: '#374151', // Change this color to match your navbar color
      }}
    >
      <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
