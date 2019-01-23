const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const PORT = 5000;
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(passport.initialize());

mongoose.connect('mongodb://localhost:27017/cocktail-app');
mongoose.connection.on('connected', () => {
  console.log('connected to mongod');
});
mongoose.connection.on('error', () => {
  console.log('failed to connect to mongod');
});

app.use(require('./controllers'))
app.get('/', (req, res) => {
  res.send("API is working")
})


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
