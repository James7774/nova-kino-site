import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, Home, Film, Library, TrendingUp, LogIn, Monitor } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
    if (searchOpen) setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery('');
      setSearchOpen(false);
    }
  };

  const isAdmin = localStorage.getItem('userInfo');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">
              <img src="/favicon.png" alt="" />
            </div>
            <span className="logo-text">NOVA<span>KINO</span></span>
          </Link>

          <div className="nav-center">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <Home size={16} /> Bosh sahifa
            </Link>
            <Link to="/movies" className={`nav-link ${location.pathname === '/movies' ? 'active' : ''}`}>
              <Film size={16} /> Kinolar
            </Link>
            <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>
              <Library size={16} /> Janrlar
            </Link>
            <Link to="/trending" className={`nav-link ${location.pathname === '/trending' ? 'active' : ''}`}>
              <TrendingUp size={16} /> Trendda
            </Link>
          </div>

          <div className="nav-right">
            <div className={`nav-search-bar ${searchOpen ? 'open' : ''}`}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Kino qidirish..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit"><Search size={18} /></button>
              </form>
            </div>
            
            <button className="nav-icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={20} />
            </button>
            
            <Link to={isAdmin ? '/admin' : '/admin/login'} className="nav-admin-btn">
              {isAdmin ? <Monitor size={20} /> : <User size={20} />}
            </Link>

            <button className="nav-mobile-burger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <aside className={`mobile-sidebar ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-sidebar-content">
          <div className="mobile-sidebar-header">
            <Link to="/" className="nav-logo">
              <span className="logo-text">NOVA<span>KINO</span></span>
            </Link>
            <button onClick={() => setMenuOpen(false)}><X size={24} /></button>
          </div>

          <div className="mobile-nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <Home size={20} /> Bosh sahifa
            </Link>
            <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}>
              <Film size={20} /> Kinolar
            </Link>
            <Link to="/categories" className={location.pathname === '/categories' ? 'active' : ''}>
              <Library size={20} /> Janrlar
            </Link>
            <Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}>
              <TrendingUp size={20} /> Trendda
            </Link>
          </div>

          <div className="mobile-sidebar-footer">
            <Link to={isAdmin ? '/admin' : '/admin/login'} className="mobile-auth-btn">
              {isAdmin ? <>Admin Panel <Monitor size={18} /></> : <>Kirish <LogIn size={18} /></>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Floating Bottom Nav for Mobile */}
      <div className="floating-bottom-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}><Home size={22} /></Link>
        <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}><Film size={22} /></Link>
        <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}><Search size={22} /></Link>
        <Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}><TrendingUp size={22} /></Link>
        <Link to={isAdmin ? '/admin' : '/admin/login'} className={location.pathname.startsWith('/admin') ? 'active' : ''}>
          {isAdmin ? <Monitor size={22} /> : <User size={22} />}
        </Link>
      </div>
    </>
  );
};

export default Navbar;
