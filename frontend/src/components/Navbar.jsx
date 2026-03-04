import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`uz-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container uz-nav-container">
        <Link to="/" className="uz-nav-logo">
          NOVA<span>KINO</span><span>.VIP</span>
        </Link>
        
        <button className="uz-menu-trigger">
          <Menu size={20} />
          <span>MENYU</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
