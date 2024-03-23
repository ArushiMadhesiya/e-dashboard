import React, { useEffect } from 'react';
import './Navbar.css'
import { BrowserRouter as Router, Route, Switch,Link, Routes,useNavigate } from 'react-router-dom';

const Navbar = () => {
  const auth=localStorage.getItem('user');
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/')
  }
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-logo">Logo</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to='/' className="nav-link">HOME</Link>
          </li>
          <li className="nav-item">
            <Link to='/about' className="nav-link">about</Link>
          </li>
          <li className="nav-item">
          <Link to='/services' className="nav-link">services</Link>
          </li>
          <li className="nav-item">
          <Link to='/contact' className="nav-link">contact</Link>
          </li>
          <li className="nav-item">
          <Link to='/add' className="nav-link">add product</Link>
          </li>
          <li className="nav-item">
          <Link to='/update' className="nav-link">update product</Link>
          </li>
          
          <li className="nav-item">
          <Link to='/profile' className="nav-link">profile</Link>
          </li>
          
          
          {
            !auth?  <li className="nav-item">
          <Link to='/signup' className="nav-link">signup</Link>
          </li>:<li className="nav-item">
          <Link to='/signup' className="nav-link" onClick={logout}>log out</Link>
          </li>
          }
          
        </ul>
      </div>
    </nav>
   
  
  );
};

export default Navbar;
