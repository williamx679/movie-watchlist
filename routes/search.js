const router = require('express').Router();
const axios  = require('axios');

router.get('/', async (req, res) => {
  const { title } = req.query;
  try {
    const omdb = await axios.get('http://www.omdbapi.com/', {
      params: { apikey: process.env.OMDB_KEY, s: title }
    });
    res.json(omdb.data);
  } catch (err) {
    res.status(500).json({ error: 'OMDb request failed.' });
  }
});

module.exports = router;
