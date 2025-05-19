require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err=> console.error(err));

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/api/search', require('./routes/search'));
app.use('/api/watchlist', require('./routes/watchlist'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
