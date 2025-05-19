const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  imdbID:    { type: String, required: true, unique: true },
  Title:     String,
  Year:      String,
  Poster:    String,
  rating:    Number,    // your personal 1–5 rating
  notes:     String,    // any short text
  addedAt:   { type: Date, default: Date.now }
});

module.exports = model('Movie', movieSchema);
