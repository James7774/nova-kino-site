import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Calendar } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="movie-card-premium">
      <div className="card-image-wrap">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="card-overlay">
          <div className="play-icon-circle">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
        
        {movie.quality && <span className="card-quality-tag">{movie.quality}</span>}
        {movie.rating > 0 && (
          <span className="card-rating-tag">
            <Star size={10} fill="#e5b95f" color="#e5b95f" />
            {movie.rating}
          </span>
        )}
      </div>
      
      <div className="card-info-wrap">
        <h3 className="card-movie-title">{movie.title}</h3>
        <div className="card-subtitle-row">
          <span>{movie.year}</span>
          <span className="dot-separator">•</span>
          <span>{movie.genres?.[0] || 'Kino'}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
