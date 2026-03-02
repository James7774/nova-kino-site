import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import { Film, Filter } from 'lucide-react';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryGenre = new URLSearchParams(location.search).get('genre') || '';
  const [genre, setGenre] = useState(queryGenre);

  useEffect(() => {
    setGenre(queryGenre);
  }, [queryGenre]);

  const genres = ['Barcha', 'Jangari', 'Drama', 'Komediya', 'Fantastika', 'Triller', 'Multfilm'];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = genre && genre !== 'Barcha' 
          ? `/movies?genre=${genre}`
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
  }, [genre]);

  return (
    <div className="movies-page container">
      <div className="page-header">
        <h2 className="section-title"><span className="bar"></span><Film size={20} /> Barcha kinolar</h2>
        <div className="filter-box">
          <Filter size={16} />
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-screen">Yuklanmoqda...</div>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map(m => <MovieCard key={m._id} movie={m} />)
          ) : (
            <p className="no-result">Hozircha kinolar yo'q</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
