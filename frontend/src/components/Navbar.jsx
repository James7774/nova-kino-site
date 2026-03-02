import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, UserCircle, Home, Film, Compass, LogIn } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
    if (searchOpen) setSearchOpen(false);
  }, [location]);

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
            <img src="/favicon.png" alt="Logo" className="nav-logo-img" />
            Nova<span>Kino</span>
          </Link>

          <div className="nav-center">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Bosh sahifa</Link>
            <Link to="/movies" className={`nav-link ${location.pathname === '/movies' ? 'active' : ''}`}>Kinolar</Link>
            <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>Janrlar</Link>
            <Link to="/trending" className={`nav-link ${location.pathname === '/trending' ? 'active' : ''}`}>Trendda</Link>
          </div>

          <div className="nav-right">
            <form className={`nav-search ${searchOpen ? 'open' : ''}`} onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Qidirish..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit"><Search size={16} /></button>
            </form>
            <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={18} />
            </button>
            <Link to={isAdmin ? '/admin' : '/admin/login'} className="icon-btn">
              <UserCircle size={18} />
            </Link>
            <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <span className="nav-logo">
            <img src="/favicon.png" alt="Logo" className="nav-logo-img" />
            Nova<span>Kino</span>
          </span>
          <button onClick={() => setMenuOpen(false)}><X size={20} /></button>
        </div>
        <form className="mobile-search" onSubmit={handleSearch}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Film qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <div className="mobile-links">
          <Link to="/" onClick={() => setMenuOpen(false)}>Bosh sahifa</Link>
          <Link to="/movies" onClick={() => setMenuOpen(false)}>Kinolar</Link>
          <Link to="/categories" onClick={() => setMenuOpen(false)}>Janrlar</Link>
          <Link to="/trending" onClick={() => setMenuOpen(false)}>Trendda</Link>
          <Link to={isAdmin ? '/admin' : '/admin/login'} onClick={() => setMenuOpen(false)}>
            {isAdmin ? 'Admin Panel' : 'Kirish'}
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-bottom-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}><Home size={18} /><span>Bosh</span></Link>
        <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}><Film size={18} /><span>Kinolar</span></Link>
        <Link to="/categories" className={location.pathname === '/categories' ? 'active' : ''}><Compass size={18} /><span>Janrlar</span></Link>
        <Link to={isAdmin ? '/admin' : '/admin/login'} className={location.pathname.startsWith('/admin') ? 'active' : ''}><LogIn size={18} /><span>Kirish</span></Link>
      </div>
    </>
  );
};

export default Navbar;
