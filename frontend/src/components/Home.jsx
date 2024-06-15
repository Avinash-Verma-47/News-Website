import React, { useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';
import SearchBar from './SearchBar';
import NewsList from './NewsList';
import Notes from './Notes';
import Navbar from './Navbar';
import axios from 'axios';

function Home() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 21;
  const [fetchType, setFetchType] = useState('topHeadlines');
  const [fetchParams, setFetchParams] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false); 


  const fetchNews = async (topic) => {
    if(fetchType!='search'){
      setCurrentPage(1);
    }
    setIsSearching('true');
    setFetchType('search');
    setFetchParams({ topic });
    console.log("fetch");
    try {
      const response = await axios.get(`http://localhost:5000/api/news?topic=${topic}&page=${currentPage}`);
      setNews(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / pageSize));
    } catch (error) {
      alert('Error fetching news');
    }
  };

  const fetchNewsByCategory = async (category,country) => {
    if(fetchType!='category'){
      setCurrentPage(1);
    }
    setIsSearching(true);    
    setFetchType('category');
    setFetchParams({ category, country });
    try {
      const response = await axios.get('http://localhost:5000/api/category', {
        params: { category ,country, page: currentPage}
      });
      setNews(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / pageSize));
    } catch (error) {
      alert('Error fetching news by category');
    }
  };

  
  const fetchTopHeadlines = async () => {
    setIsDataFetched(false);
    if(fetchType!='topHeadlines'){
      setCurrentPage(1);
    }
    setIsSearching(false);
    setFetchType('topHeadlines');
    try {
      const response = await axios.get(`http://localhost:5000/api/top-headlines?page=${currentPage}`);
      setNews(response.data.articles);
      console.log("res: ", response.data.articles); 
      console.log("news: ", news);  
      setIsDataFetched(true);
      setTotalPages(Math.ceil(response.data.totalResults / pageSize));
    } catch (error) {
      alert('Error fetching top headlines');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
      });
    }
  }, []);

  useEffect(() => {
    if (fetchType === 'topHeadlines') {
      fetchTopHeadlines();
    } else if (fetchType === 'category') {
      fetchNewsByCategory(fetchParams.category, fetchParams.country);
    } else if (fetchType === 'search') {
      fetchNews(fetchParams.topic);
    }
  }, [currentPage]);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <>
    <div>
      {!user ? (
        <>
          <Login setUser={setUser} />
        </>
      ) : (
        <>
          <Navbar fetchNewsByCategory={fetchNewsByCategory}/>
          <SearchBar fetchNews={fetchNews} />
          {isDataFetched?(<NewsList news={news} isSearching={isSearching} setIsSearching={setIsSearching} currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            fetchTopHeadlines={fetchTopHeadlines}
            />
          ): (
            <div>Loading...</div>
          )}
          
        </>
      )}
    </div>
    </>
  );
}

export default Home;
