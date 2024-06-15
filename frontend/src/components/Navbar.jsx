import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({fetchNewsByCategory}) {
    const [selectedCountry, setSelectedCountry] = useState('in');
    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        fetchNewsByCategory('general',country)
      };

      const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; 
      };

  return (
    <nav className="bg-gray-800 sticky top-0 z-10 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select value={selectedCountry} onChange={handleCountryChange} className="text-white bg-gray-900 border rounded px-3 py-1">
              <option value="">Select Country</option>
              <option value="ae">United Arab Emirates</option>
              <option value="ar">Argentina</option>
              <option value="at">Austria</option>
              <option value="au">Australia</option>
              <option value="be">Belgium</option>
              <option value="bg">Bulgaria</option>
              <option value="br">Brazil</option>
              <option value="ca">Canada</option>
              <option value="ch">Switzerland</option>
              <option value="cn">China</option>
              <option value="co">Colombia</option>
              <option value="cu">Cuba</option>
              <option value="cz">Czech Republic</option>
              <option value="de">Germany</option>
              <option value="eg">Egypt</option>
              <option value="fr">France</option>
              <option value="gb">United Kingdom</option>
              <option value="gr">Greece</option>
              <option value="hk">Hong Kong</option>
              <option value="hu">Hungary</option>
              <option value="id">Indonesia</option>
              <option value="ie">Ireland</option>
              <option value="il">Israel</option>
              <option value="in">India</option>
              <option value="it">Italy</option>
              <option value="jp">Japan</option>
              <option value="kr">South Korea</option>
              <option value="lt">Lithuania</option>
              <option value="lv">Latvia</option>
              <option value="ma">Morocco</option>
              <option value="mx">Mexico</option>
              <option value="my">Malaysia</option>
              <option value="ng">Nigeria</option>
              <option value="nl">Netherlands</option>
              <option value="no">Norway</option>
              <option value="nz">New Zealand</option>
              <option value="ph">Philippines</option>
              <option value="pl">Poland</option>
              <option value="pt">Portugal</option>
              <option value="ro">Romania</option>
              <option value="rs">Serbia</option>
              <option value="ru">Russia</option>
              <option value="sa">Saudi Arabia</option>
              <option value="se">Sweden</option>
              <option value="sg">Singapore</option>
              <option value="si">Slovenia</option>
              <option value="sk">Slovakia</option>
              <option value="th">Thailand</option>
              <option value="tr">Turkey</option>
              <option value="tw">Taiwan</option>
              <option value="ua">Ukraine</option>
              <option value="us">United States</option>
              <option value="ve">Venezuela</option>
              <option value="za">South Africa</option>
            </select>
            </div>
          <div className="flex items-center space-x-4">
            <a href="#" onClick={() => fetchNewsByCategory('business',selectedCountry)} className="text-white hover:text-gray-300">Business</a>
            <a href="#" onClick={() => fetchNewsByCategory('entertainment',selectedCountry)} className="text-white hover:text-gray-300">Entertainment</a>
            <a href="#" onClick={() => fetchNewsByCategory('general',selectedCountry)} className="text-white hover:text-gray-300">General</a>
            <a href="#" onClick={() => fetchNewsByCategory('health',selectedCountry)} className="text-white hover:text-gray-300">Health</a>
            <a href="#" onClick={() => fetchNewsByCategory('science',selectedCountry)} className="text-white hover:text-gray-300">Science</a>
            <a href="#" onClick={() => fetchNewsByCategory('sports',selectedCountry)} className="text-white hover:text-gray-300">Sports</a>
            <a href="#" onClick={() => fetchNewsByCategory('technology',selectedCountry)} className="text-white hover:text-gray-300">Technology</a>
          </div>
          <div>
            <NavLink to="/" className="text-white hover:text-gray-300 mr-4">Home</NavLink>
            <NavLink 
      to="/notes" 
      className="text-white hover:text-gray-300 mr-4">
      My Notes
    </NavLink>
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

export default Navbar;
