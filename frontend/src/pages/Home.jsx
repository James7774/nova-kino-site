import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import CircularStories from '../components/CircularStories';
import MovieSlider from '../components/MovieSlider';
import { TrendingUp, Clock, Flame, Search, Grid, Mail, Bell, MessageSquare, Send } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/movies?limit=50');
        if (res.data && res.data.length > 0) {
          setMovies(res.data);
        }
      } catch {
        console.log('API fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  if (loading) {
    return (
      <div className="home-loading-v2">
        <div className="spinner"></div>
      </div>
    );
  }

  const trending = movies.filter(m => m.isTrending);
  const latest = [...movies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="uz-home-wrap fade-in">
      {/* Uzmovi-style Circular Avatars */}
      <CircularStories movies={movies.slice(0, 18)} />

      <main className="container home-main-v2">
        {/* Auth Actions Row (Uzmovi Style) */}
        <div className="home-action-row">
          <div className="auth-btns">
            <a href="/admin/login" className="uz-btn-auth">Kirish</a>
            <a href="/" className="uz-btn-auth secondary">Ro'yxatdan o'tish</a>
          </div>
          <div className="icon-btns">
            <button className="uz-icon-btn"><Search size={18} /></button>
            <button className="uz-icon-btn"><Grid size={18} /></button>
            <button className="uz-icon-btn"><Mail size={18} /></button>
            <button className="uz-icon-btn"><MessageSquare size={18} /></button>
          </div>
        </div>

        {/* Big Search Bar */}
        <div className="uz-search-box">
          <input 
            type="text" 
            placeholder="Qidirish..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Search className="uz-search-icon" size={24} />
        </div>

        {/* Section: Premyeralar */}
        <section className="uz-section">
          <div className="uz-section-head">
            <h2 className="uz-title-accent">PREMYERALAR</h2>
          </div>
          <MovieSlider movies={movies.slice(0, 12)} />
        </section>

        {/* Section: Trendda */}
        <section className="uz-section">
          <div className="uz-section-head">
            <h2 className="uz-title-accent teal">TRENDDA</h2>
          </div>
          <MovieSlider movies={(trending.length > 0 ? trending : movies).slice(0, 12)} />
        </section>

        {/* Section: So'nggi Qo'shilganlar */}
        <section className="uz-section">
          <div className="uz-section-head">
            <h2 className="uz-title-accent gold">SO'NGGI QO'SHILGANLAR</h2>
          </div>
          <MovieSlider movies={latest.slice(0, 12)} />
        </section>
      </main>
      
      {/* Floating Telegram Info (Uzmovi style) */}
      <a href="https://t.me/" target="_blank" rel="noreferrer" className="uz-tg-btn">
        <Send size={24} fill="#fff" />
      </a>
    </div>
  );
};

export default Home;
