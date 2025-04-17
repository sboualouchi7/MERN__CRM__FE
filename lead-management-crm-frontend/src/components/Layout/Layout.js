import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
import './layout.css';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout-container">
      <Header />
      <div className="content-container">
        {isAuthenticated && <Sidebar />}
        <main className={`main-content ${!isAuthenticated ? 'no-sidebar' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;