const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    coverImage: { type: String },
    videoUrl: { type: String, required: true },
    trailerUrl: { type: String },
    year: { type: Number, required: true },
    country: { type: String },
    genres: [{ type: String }],
    quality: { type: String, default: 'HD' },
    rating: { type: Number, default: 0 },
    isTrending: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
