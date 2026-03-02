import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const Hero = ({ movies }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;
  const movie = movies[index];

  return (
    <div className="hero">
      <div className="hero-bg-img" style={{ backgroundImage: `url(${movie.coverImage || movie.poster})` }} key={`bg-${movie._id}`} />
      
      <div className="container hero-inner">
        <div className="hero-content" key={`content-${movie._id}`}>
          <span className="hero-tag">Premyera</span>
          <h1 className="hero-title">{movie.title}</h1>
          <div className="hero-meta">
            <span className="meta-item"><Calendar size={18} /> {movie.year}</span>
            <span className="meta-item"><Star size={18} fill="currentColor" /> {movie.rating || 'N/A'}</span>
            <span className="meta-badge">{movie.quality}</span>
          </div>
          <p className="hero-desc">
            {movie.description?.substring(0, 220)}...
          </p>
          <div className="hero-actions">
            <Link to={`/movie/${movie._id}`} className="btn-watch">
              <Play size={20} fill="currentColor" /> Ko'rish
            </Link>
            <Link to={`/movie/${movie._id}`} className="btn-info">
              Batafsil
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {movies.slice(0, 5).map((_, i) => (
          <span 
            key={i} 
            className={`dot ${i === index ? 'active' : ''}`} 
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
