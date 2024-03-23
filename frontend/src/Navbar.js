import React from 'react';
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-logo">Logo</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#services" className="nav-link">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
