import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import { Film, Filter, Search, Grid } from 'lucide-react';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryGenre = new URLSearchParams(location.search).get('genre') || 'Barcha';
  const [activeGenre, setActiveGenre] = useState(queryGenre);

  const genres = ['Barcha', 'Jangari', 'Drama', 'Komediya', 'Fantastika', 'Triller', 'Multfilm', 'Sarguzasht', 'Qo\'rqinchli'];

  useEffect(() => {
    setActiveGenre(queryGenre);
  }, [queryGenre]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = activeGenre !== 'Barcha' 
          ? `/movies?genre=${activeGenre}`
          : '/movies';
        const { data } = await api.get(url);
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [activeGenre]);

  return (
    <div className="movies-premium-page fade-in">
      <div className="movies-hero">
        <div className="container hero-inner-v2">
          <h1><Grid size={32} /> BARCHA KINOLAR</h1>
          <p>Sevimli kinolaringizni janrlar bo'yicha saralang</p>
        </div>
      </div>

      <div className="container movies-content-v2">
        <div className="genre-filter-rail">
          {genres.map(g => (
            <button 
              key={g} 
              className={`genre-bubble ${activeGenre === g ? 'active' : ''}`}
              onClick={() => setActiveGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>

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
                <Search size={48} />
                <p>Ushbu janrda filmlar topilmadi.</p>
                <button onClick={() => setActiveGenre('Barcha')}>Barcha filmlar</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
