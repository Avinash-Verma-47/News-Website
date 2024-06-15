import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NotesNavbar() {

      const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; 
      };

  return (
    <nav className="bg-gray-800 sticky top-0 z-10 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          
          <div>
            <NavLink to="/" className="text-white hover:text-gray-300 mr-4">Home</NavLink>
    <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default NotesNavbar;
