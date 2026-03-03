import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Film, Library, TrendingUp, Monitor, User, LogIn, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [location.pathname, menuOpen]);

  const isAdmin = localStorage.getItem('userInfo');

  return (
    <>
      <nav className={`uz-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container uz-nav-inner">
          <Link to="/" className="uz-logo">
            <span className="logo-text">NOVA<span>KINO.UZ</span></span>
          </Link>

          <div className="uz-nav-center">
            <Link to="/" className={`uz-nav-link ${location.pathname === '/' ? 'active' : ''}`}>BOSH SAHIFA</Link>
            
            <div className="uz-nav-dropdown">
              <Link to="/movies" className={`uz-nav-link ${location.pathname === '/movies' ? 'active' : ''}`}>
                KINOLAR <ChevronDown size={14} />
              </Link>
              <div className="uz-dropdown-menu">
                <Link to="/movies?genre=Uzbek">O'zbek tilida</Link>
                <Link to="/movies?genre=Tarjima">Tarjima kinolar</Link>
                <Link to="/movies?genre=Multfilm">Multfilmlar</Link>
              </div>
            </div>

            <Link to="/movies?genre=Serial" className="uz-nav-link">REJADAGI</Link>
            <Link to="/categories" className="uz-nav-link">JANR</Link>
            <Link to="/trending" className="uz-nav-link">TRENDDA</Link>
          </div>

          <div className="uz-nav-right">
            <Link to={isAdmin ? '/admin' : '/admin/login'} className="uz-admin-icon">
              {isAdmin ? <Monitor size={20} /> : <User size={20} />}
            </Link>
            <button className="uz-burger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <aside className={`uz-mobile-menu ${menuOpen ? 'active' : ''}`}>
        <div className="uz-menu-content">
          <div className="uz-menu-header">
             <span className="logo-text">NOVA<span>KINO</span></span>
             <button onClick={() => setMenuOpen(false)}><X size={28} /></button>
          </div>
          <div className="uz-menu-links">
            <Link to="/">BOSH SAHIFA</Link>
            <Link to="/movies">KINOLAR</Link>
            <Link to="/trending">TRENDDA</Link>
            <Link to="/categories">JANRLAR</Link>
          </div>
          <div className="uz-menu-footer">
            <Link to="/admin/login" className="uz-mobile-auth">
              {isAdmin ? 'Admin Panel' : 'Kirish'}
            </Link>
          </div>
        </div>
      </aside>

      {/* Floating Bottom Nav for Mobile UI Experience */}
      <div className="floating-bottom-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}><Home size={22} /></Link>
        <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}><Film size={22} /></Link>
        <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}><Search size={22} /></Link>
        <Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}><TrendingUp size={22} /></Link>
      </div>
    </>
  );
};

export default Navbar;
