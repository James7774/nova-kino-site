import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import './Hero.css';

const Hero = ({ movies }) => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev === (movies?.length || 1) - 1 ? 0 : prev + 1));
      setTimeout(() => setAnimating(false), 50);
    }, 400);
  }, [animating, movies]);


  useEffect(() => {
    if (!movies || movies.length <= 1) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [movies, nextSlide]);

  if (!movies || movies.length === 0) return null;
  const movie = movies[index];

  return (
    <div className="hero-section">
      <div className={`hero-carousel ${animating ? 'fade-out' : 'fade-in'}`}>
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${movie.coverImage || movie.poster})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-overlay-bottom" />
        </div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="hero-quality-badge">{movie.quality || 'HD'}</span>
              <span className="hero-quality-badge">{movie.year}</span>
            </div>
            
            <h1 className="hero-main-title">{movie.title}</h1>
            
            <div className="hero-metadata-row">
              <div className="meta-item accent-text"><Star size={18} fill="currentColor" /> {movie.rating || '8.5'}</div>
              <div className="meta-item genre-tags">
                {movie.genres?.slice(0, 3).map(g => <span key={g}>{g}</span>)}
              </div>
            </div>

            <p className="hero-description">{movie.description}</p>
            
            <div className="hero-button-group">
              <Link to={`/movie/${movie._id}`} className="hero-btn-primary">
                <Play size={20} fill="currentColor" /> Ko'rish
              </Link>
              <Link to={`/movie/${movie._id}`} className="hero-btn-secondary">
                Batafsil
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-navigation">
        <div className="hero-pagination">
          {movies.slice(0, 5).map((_, i) => (
            <div 
              key={i} 
              className={`pagination-bar ${i === index ? 'active' : ''}`} 
              onClick={() => !animating && setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
