import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

        <Header/>
        <App/>
        
  </React.StrictMode>,
)
