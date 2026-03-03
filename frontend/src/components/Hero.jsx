import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const Hero = ({ movies }) => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev === (movies?.length || 1) - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 600);
  }, [animating, movies]);

  const prevSlide = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? (movies?.length || 1) - 1 : prev - 1));
      setAnimating(false);
    }, 600);
  };

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
              <span className="hero-status-badge">PREMYERA</span>
              <span className="hero-quality-badge">{movie.quality || 'HD'}</span>
            </div>
            
            <h1 className="hero-main-title">{movie.title}</h1>
            
            <div className="hero-metadata-row">
              <div className="meta-item"><Calendar size={16} /> {movie.year}</div>
              <div className="meta-item accent-text"><Star size={16} fill="var(--accent)" /> {movie.rating || '8.5'}</div>
              <div className="meta-item genre-tags">
                {movie.genres?.slice(0, 2).map(g => <span key={g}>{g}</span>)}
              </div>
            </div>

            <p className="hero-description">{movie.description}</p>
            
            <div className="hero-button-group">
              <Link to={`/movie/${movie._id}`} className="hero-btn-primary">
                <Play size={20} fill="currentColor" /> Ko'rish
              </Link>
              <Link to={`/movie/${movie._id}`} className="hero-btn-secondary">
                <Info size={20} /> Batafsil
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-navigation">
        <button onClick={prevSlide} className="nav-arrow"><ChevronLeft size={24} /></button>
        <div className="hero-pagination">
          {movies.slice(0, 5).map((_, i) => (
            <div 
              key={i} 
              className={`pagination-bar ${i === index ? 'active' : ''}`} 
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="nav-arrow"><ChevronRight size={24} /></button>
      </div>
    </div>
  );
};

export default Hero;
