import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Hero from '../components/Hero';
import MovieSlider from '../components/MovieSlider';
import CircularStories from '../components/CircularStories';
import { TrendingUp, Clock, Flame, Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>NovaKino yuklanmoqda...</p>
      </div>
    );
  }

  const trending = movies.filter(m => m.isTrending);
  const latest = [...movies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="home-page-premium fade-in">
      <CircularStories movies={movies.slice(0, 15)} />
      <Hero movies={trending.length > 0 ? trending : movies.slice(0, 5)} />

      <main className="container home-content-wrap">
        <section className="home-section-premium">
          <div className="section-header">
            <h2 className="section-title"><Flame size={20} /> PREMYERALAR</h2>
            <a href="/movies" className="see-all">Barchasi →</a>
          </div>
          <MovieSlider movies={movies.slice(0, 15)} />
        </section>

        <section className="home-section-premium">
          <div className="section-header">
            <h2 className="section-title"><TrendingUp size={20} /> TRENDDA</h2>
            <a href="/trending" className="see-all">Barchasi →</a>
          </div>
          <MovieSlider movies={(trending.length > 0 ? trending : movies).slice(0, 15)} />
        </section>

        <div className="promo-banner-glass">
          <div className="promo-content">
            <h3><Sparkles size={24} /> O'zbek tilidagi eng sara kinolar faqat NovaKino'da!</h3>
            <p>Hamma kinolar yuqori sifatda va mutlaqo bepul.</p>
          </div>
        </div>

        <section className="home-section-premium">
          <div className="section-header">
            <h2 className="section-title"><Clock size={20} /> SO'NGGI QO'SHILGANLAR</h2>
            <a href="/movies" className="see-all">Barchasi →</a>
          </div>
          <MovieSlider movies={latest.slice(0, 15)} />
        </section>
      </main>
    </div>
  );
};

export default Home;
