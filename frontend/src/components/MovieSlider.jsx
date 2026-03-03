import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import './MovieSlider.css';

const MovieSlider = ({ movies }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);

  const startDragging = (e) => {
    setIsDragging(true);
    const x = e.pageX || e.touches[0].pageX;
    setStartX(x - sliderRef.current.offsetLeft);
    setCurrentScroll(sliderRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const scrollX = x - sliderRef.current.offsetLeft;
    const walk = (scrollX - startX) * 1.5;
    sliderRef.current.scrollLeft = currentScroll - walk;
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="slider-outer-wrapper">
      <div 
        className={`movie-rail ${isDragging ? 'is-dragging' : ''}`}
        ref={sliderRef}
        onMouseDown={startDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onMouseMove={onDragging}
        onTouchStart={startDragging}
        onTouchEnd={stopDragging}
        onTouchMove={onDragging}
      >
        {movies.map((movie) => (
          <div key={movie._id} className="rail-item">
            <MovieCard movie={movie} />
          </div>
        ))}
        {/* Extra spacer for end of slider */}
        <div className="rail-spacer" />
      </div>
    </div>
  );
};

export default MovieSlider;
