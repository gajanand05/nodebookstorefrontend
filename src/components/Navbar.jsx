import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem("authToken"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // optional: remove stored user info as well
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

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

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/register" className="btn register-btn">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn register-btn">Logout</button>
        )}
      </div>

      <style jsx>{`
        .login-btn,
        .register-btn {
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 500;
          transition: background 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .login-btn {
          background: #fbbf24;
          color: #000;
        }

        .register-btn {
          background: #34d399;
          color: #000;
        }

        .login-btn:hover {
          background: #f59e0b;
        }

        .register-btn:hover {
          background: #10b981;
        }

        .search-login {
          display: flex;
          align-items: center;
          gap: 12px;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
