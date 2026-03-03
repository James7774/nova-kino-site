import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import { Flame, TrendingUp } from 'lucide-react';
import './Movies.css'; // Reusing premium grid styles

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await api.get('/movies?trending=true');
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="movies-premium-page fade-in">
      <div className="movies-hero trending-hero">
        <div className="container hero-inner-v2">
          <h1><Flame size={32} color="#ff4d4d" /> TRENDDAGI KINOLAR</h1>
          <p>Hozirgi vaqtda eng ko'p ko'rilayotgan sara filmlar</p>
        </div>
      </div>

      <div className="container movies-content-v2">
        {loading ? (
          <div className="loading-grid">
            <div className="spinner"></div>
            <span>Filmlar yuklanmoqda...</span>
          </div>
        ) : (
          <div className="movie-grid-v2">
            {movies.length > 0 ? (
              movies.map(m => <MovieCard key={m._id} movie={m} />)
            ) : (
              <div className="no-result-v2">
                <TrendingUp size={48} />
                <p>Hozircha trendda filmlar mavjud emas.</p>
                <button onClick={() => window.location.href = '/movies'}>Barcha filmlar</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
