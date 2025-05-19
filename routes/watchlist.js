const router = require('express').Router();
const Movie  = require('../models/Movie');

router.get('/', async (req, res) => {
  res.json(await Movie.find().sort({ addedAt: -1 }));
});

router.post('/', async (req, res) => {
  try {
    const m = new Movie(req.body);
    await m.save();
    res.status(201).json(m);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Movie.findOneAndDelete({ imdbID: req.params.id });
  res.sendStatus(204);
});

module.exports = router;
