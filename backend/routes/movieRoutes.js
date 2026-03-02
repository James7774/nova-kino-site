const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getMovies).post(protect, createMovie);
router
  .route('/:id')
  .get(getMovieById)
  .put(protect, updateMovie)
  .delete(protect, deleteMovie);

module.exports = router;
