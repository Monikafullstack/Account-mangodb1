// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions if needed
    // For now, simply navigate to the login page
    navigate('/login');
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to the Homepage!</h1>
      <p className="homepage-content">This is the homepage content that will be visible after a successful login.</p>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
