import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <h2>📅 Event Manager</h2>
        </div>
        
        <nav className="nav">
          <Link
            to="/"
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
          >
            All Events
          </Link>
          <Link
            to="/my-events"
            className={`nav-item ${isActive('/my-events') ? 'active' : ''}`}
          >
            My Events
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
