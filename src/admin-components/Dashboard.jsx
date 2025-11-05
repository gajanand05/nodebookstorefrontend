import React from "react";
import "./../Admin.css";
import { Outlet, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaEnvelope,
  FaFileAlt,
  FaUsers,
  FaShoppingCart
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>📘 Admin Panel</h2>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaTachometerAlt className="menu-icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products">
              <FaBook className="menu-icon" /> Books
            </Link>
          </li>
          <li>
            <Link to="/dashboard/contacts">
              <FaEnvelope className="menu-icon" /> All Contacts
            </Link>
          </li>
          <li>
            <Link to="/dashboard/pages">
              <FaFileAlt className="menu-icon" /> Pages
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users">
              <FaUsers className="menu-icon" /> Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders">
              <FaShoppingCart className="menu-icon" /> Orders
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet /> {/* ✅ Nested routes render here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
