import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import CircularStories from '../components/CircularStories';
import MovieSlider from '../components/MovieSlider';
import { Search, User, UserPlus, Menu, Send, ChevronDown, Play } from 'lucide-react';
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
      <div className="uz-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  const latest = [...movies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const featured = movies.slice(0, 5);

  return (
    <div className="uz-page-wrapper">
      {/* 1. Circular Stories */}
      <CircularStories movies={movies.slice(0, 18)} />

      <div className="container">
        {/* 2. Auth Row */}
        <div className="uz-auth-row">
          <div className="uz-auth-box">
             <a href="/admin/login" className="uz-auth-link">
               <User size={14} /> Kirish
             </a>
             <a href="/" className="uz-auth-link">
               Ro'yxatdan o'tish
             </a>
          </div>
          <button className="uz-filter-btn">
            <ChevronDown size={18} />
          </button>
        </div>

        {/* 3. Search Box */}
        <div className="uz-search-wrapper">
          <input 
            type="text" 
            placeholder="Qidirish..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Search className="uz-search-icon" size={18} />
        </div>

        {/* 4. Main Sections */}
        <section className="uz-main-section">
          <div className="uz-section-title">
            <span>PREMYERALAR</span>
          </div>
          
          {/* Simple Hero/Featured Slider like Uzmovi */}
          <div className="uz-featured-slider">
             <div className="uz-slide-item">
                <img src={featured[0]?.poster} alt="" />
                <div className="uz-play-overlay">
                   <div className="uz-play-circle">
                      <Play size={24} fill="#fff" />
                   </div>
                </div>
                <div className="uz-slide-info">
                   <h3>{featured[0]?.title} (premyera, o'zbek tilida, Uzbek)</h3>
                </div>
             </div>
          </div>
        </section>

        <section className="uz-main-section">
          <div className="uz-section-title teal">
            <span>TARJIMA KINOLAR</span>
          </div>
          <MovieSlider movies={movies.slice(6, 18)} />
        </section>

        <section className="uz-main-section">
          <div className="uz-section-title gold">
            <span>SO'NGGI QO'SHILGANLAR</span>
          </div>
          <MovieSlider movies={latest.slice(0, 12)} />
        </section>
      </div>

      {/* Telegram Floating Button */}
      <a href="https://t.me/" target="_blank" rel="noreferrer" className="uz-tg-float">
        <Send size={22} fill="#fff" />
      </a>
    </div>
  );
};

export default Home;
