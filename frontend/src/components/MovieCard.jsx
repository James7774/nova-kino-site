import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="m-card">
      <div className="m-card-img">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="m-card-hover">
          <Play size={20} fill="#fff" />
        </div>
        {movie.quality && <span className="m-badge">{movie.quality}</span>}
        {movie.rating > 0 && (
          <span className="m-rating">
            <Star size={10} fill="#f5c518" color="#f5c518" />
            {movie.rating}
          </span>
        )}
      </div>
      <div className="m-card-body">
        <h3 className="m-card-title">{movie.title}</h3>
        <p className="m-card-sub">{movie.year}{movie.genres?.[0] ? ` • ${movie.genres[0]}` : ''}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
