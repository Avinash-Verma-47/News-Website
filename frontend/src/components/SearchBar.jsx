import React, { useState } from 'react';

function SearchBar({ fetchNews }) {
  const [topic, setTopic] = useState('');

  const handleSearch = () => {
    fetchNews(topic);
  };

  return (
    <div className="flex items-center justify-center mb-4 mt-4">
      <input
        type="text"
        placeholder="Search for news..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:border-blue-500"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Search
      </button>
    </div>
  );
}

export default SearchBar;