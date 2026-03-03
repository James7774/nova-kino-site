import React from 'react';
import { Link } from 'react-router-dom';
import './CircularStories.css';

const CircularStories = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="stories-wrapper">
      <div className="stories-container">
        {movies.map(movie => (
          <Link to={`/movie/${movie._id}`} key={movie._id} className="story-item">
            <div className="story-circle">
              <img src={movie.poster} alt={movie.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CircularStories;
