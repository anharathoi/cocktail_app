const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

router.get('/home', (req, res) => {
  res.send('Public folder')
})

module.exports = router;