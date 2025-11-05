import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaPlus, FaUsers } from "react-icons/fa";


const Dashboard = () => {
  const [booksCount, setBooksCount] = useState(0);
  const [usersCount, setUsersCount] = useState(25); // example static users count

  // Fetch books count from backend (optional)
  useEffect(() => {
    fetch("http://localhost:3036/api/books")
      .then((res) => res.json())
      .then((data) => setBooksCount(data.length))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome to Dashboard</h1>

      <div className="dashboard-cards">
        <Link to="/dashboard/products" className="dashboard-card">
          <FaBook size={36} />
          <div>
            <h2>{booksCount}</h2>
            <p>Books</p>
          </div>
        </Link>

        <Link to="/dashboard/addproduct" className="dashboard-card">
          <FaPlus size={36} />
          <div>
            <h2>Add Book</h2>
            <p>Add a new book to the store</p>
          </div>
        </Link>

        <div className="dashboard-card">
          <FaUsers size={36} />
          <div>
            <h2>{usersCount}</h2>
            <p>Users</p>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <h2>Sales Overview</h2>
        <div className="chart-placeholder">
          {/* You can replace this div with a chart library like Chart.js */}
          <p>Chart will go here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;