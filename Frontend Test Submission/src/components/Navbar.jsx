import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={pathname === '/' ? 'active' : ''}>Shortener</Link>
      <Link to="/stats" className={pathname === '/stats' ? 'active' : ''}>Stats</Link>
    </nav>
  );
}

export default Navbar;
