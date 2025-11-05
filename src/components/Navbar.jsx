import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  
  return (
    <header className="header">
      <div className="logo"><Link to="/">📚 Bookstore</Link></div>
      <nav className="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li> 
      </nav>
      <div className="search-login">
        <input
          type="text"
          placeholder="Search books..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        /> 
        <button className="login-btn">Login</button>
         <button><Link to="/register">Register</Link></button> 
      </div>
    </header>
  );
};

export default Navbar;
