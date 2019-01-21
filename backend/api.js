const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/cocktail-app');
mongoose.connection.on('connected', () => {
  console.log('connected to mongod');
});

mongoose.connection.on('error', () => {
  console.log('failed to connect to mongod');
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
