import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './header.css';

const Header = () => {
  const { user, logout, isEmployer } = useAuth();

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-container">
          <h1>Lead Management CRM</h1>
        </div>
        {user && (
          <div className="user-container">
            <span className="welcome-message">Welcome, {user.name}</span>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;