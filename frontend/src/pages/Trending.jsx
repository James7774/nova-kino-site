import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Flame } from 'lucide-react';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/movies?trending=true');
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
    <div className="trending-page container" style={{ paddingTop: '40px', paddingBottom: '60px', minHeight: '80vh' }}>
      <h2 className="section-title" style={{ marginBottom: '30px' }}>
        <span className="bar"></span><Flame size={20} color="#ff4d4d" /> Trenddagi kinolar
      </h2>

      {loading ? (
        <div className="loading-screen">Yuklanmoqda...</div>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map(m => <MovieCard key={m._id} movie={m} />)
          ) : (
            <p className="no-result" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-gray)' }}>
              Hozircha trendda kinolar yo'q
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Trending;
