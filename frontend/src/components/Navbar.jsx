import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`uz-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container uz-nav-container">
        <Link to="/" className="uz-nav-logo">
          UZM<span>O</span>VÍ<span>.com</span>
        </Link>
        
        <button className="uz-menu-trigger">
          <span>MENYU</span>
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
