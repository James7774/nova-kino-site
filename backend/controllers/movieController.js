const Movie = require('../models/movieModel');
const { getJsonMovies, saveJsonMovies } = require('../utils/jsonDb');
const mongoose = require('mongoose');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all movies
const getMovies = async (req, res) => {
  try {
    const { genre, year, search, limit, trending } = req.query;

    if (!isDbConnected()) {
      let movies = getJsonMovies();
      if (search) movies = movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
      if (genre) movies = movies.filter(m => m.genres?.includes(genre));
      if (year) movies = movies.filter(m => m.year == year);
      if (trending) movies = movies.filter(m => m.isTrending);
      return res.json(movies.slice(0, limit ? parseInt(limit) : 50));
    }
    
    let query = {};
    if (genre) query.genres = genre;
    if (year) query.year = year;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (trending) query.isTrending = true;

    const movies = await Movie.find(query).sort({ createdAt: -1 }).limit(limit ? parseInt(limit) : 50);
    res.json(movies);
  } catch (error) {
    res.json(getJsonMovies()); // Final fallback
  }
};

// @desc    Get movie by ID
const getMovieById = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const movies = getJsonMovies();
      const movie = movies.find(m => m._id === req.params.id);
      return movie ? res.json(movie) : res.status(404).json({ message: 'Movie not found' });
    }
    const movie = await Movie.findById(req.params.id);
    res.json(movie || getJsonMovies().find(m => m._id === req.params.id));
  } catch (error) {
    const movie = getJsonMovies().find(m => m._id === req.params.id);
    movie ? res.json(movie) : res.status(404).json({ message: 'Movie not found' });
  }
};

// @desc    Create a movie (Admin)
const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    
    if (!isDbConnected()) {
      const movies = getJsonMovies();
      const newMovie = { ...movieData, _id: Date.now().toString() };
      movies.unshift(newMovie);
      saveJsonMovies(movies);
      return res.status(201).json(newMovie);
    }

    const movie = await Movie.create(movieData);
    res.status(201).json(movie);
  } catch (error) {
    // If DB fails during create, save to JSON as fallback
    const movies = getJsonMovies();
    const newMovie = { ...req.body, _id: Date.now().toString() };
    movies.unshift(newMovie);
    saveJsonMovies(movies);
    res.status(201).json(newMovie);
  }
};

// @desc    Update a movie (Admin)
const updateMovie = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const movies = getJsonMovies();
      const index = movies.findIndex(m => m._id === req.params.id);
      if (index !== -1) {
        movies[index] = { ...movies[index], ...req.body };
        saveJsonMovies(movies);
        return res.json(movies[index]);
      }
      return res.status(404).json({ message: 'Movie not found' });
    }
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      Object.assign(movie, req.body);
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a movie (Admin)
const deleteMovie = async (req, res) => {
  try {
    if (!isDbConnected()) {
      let movies = getJsonMovies();
      movies = movies.filter(m => m._id !== req.params.id);
      saveJsonMovies(movies);
      return res.json({ message: 'Movie removed' });
    }
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.deleteOne();
      res.json({ message: 'Movie removed' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
