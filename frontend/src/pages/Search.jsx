import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import { Search as SearchIcon, Frown } from 'lucide-react';
import './Movies.css'; // Reusing premium grid styles

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await api.get(`/movies?search=${query}`);
        setMovies(res.data);
      } catch {
        console.error('Search failed');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="movies-premium-page fade-in">
      <div className="movies-hero">
        <div className="container hero-inner-v2">
          <h1><SearchIcon size={32} /> QIDIRUV NATIJALARI</h1>
          <p>"{query}" bo'yicha topilgan natijalar</p>
        </div>
      </div>

      <div className="container movies-content-v2">
        {loading ? (
          <div className="loading-grid">
            <div className="spinner"></div>
            <span>Qidirlmoqda...</span>
          </div>
        ) : (
          <div className="movie-grid-v2">
            {movies.length > 0 ? (
              movies.map(m => <MovieCard key={m._id} movie={m} />)
            ) : (
              <div className="no-result-v2">
                <Frown size={48} />
                <p>"{query}" bo'yicha hech qanday kino topilmadi.</p>
                <button onClick={() => window.location.href = '/'}>Bosh sahifaga qaytish</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
