import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import Notes from './components/Notes';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';


import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';
import Home from './components/Home';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="notes" element={<Notes/>}/>
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router}/>
      <Outlet/>
    </>
  );
}

export default App;
