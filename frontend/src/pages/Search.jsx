import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import { Search as SearchIcon } from 'lucide-react';
import './Search.css';

const DUMMY_MOVIES = [
  { _id: '1', title: 'Avatar: Suv yo\'li', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', year: 2022, rating: 7.8, quality: '4K', genres: ['Fantastika'] },
  { _id: '2', title: 'Oppengeymer', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', year: 2023, rating: 8.9, quality: 'HD', genres: ['Drama'] },
];

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/movies?search=${query}`);
        setMovies(res.data.length > 0 ? res.data : []);
      } catch {
        const filtered = DUMMY_MOVIES.filter(m => m.title.toLowerCase().includes(query?.toLowerCase() || ''));
        setMovies(filtered);
      }
    };
    if (query) fetch();
  }, [query]);

  return (
    <div className="search-page container">
      <h2 className="section-title"><span className="bar"></span> Qidiruv: "{query}"</h2>
      {movies.length > 0 ? (
        <div className="movie-grid">{movies.map(m => <MovieCard key={m._id} movie={m} />)}</div>
      ) : (
        <div className="no-result">
          <SearchIcon size={32} color="var(--text-dark)" />
          <p>Hech narsa topilmadi</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
