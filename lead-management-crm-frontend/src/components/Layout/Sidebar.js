import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './sidebar.css';

const Sidebar = () => {
  const { isEmployer } = useAuth();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {isEmployer ? (
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <NavLink 
                to="/employer/dashboard" 
                className="sidebar-link"
                activeClassName="active"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/employer/managers" 
                className="sidebar-link"
                activeClassName="active"
              >
                Managers
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/employer/leads" 
                className="sidebar-link"
                activeClassName="active"
              >
                Leads
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <NavLink 
                to="/manager/leads" 
                className="sidebar-link"
                activeClassName="active"
              >
                My Leads
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;