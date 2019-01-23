const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));
router.use('/', require('./public')); 
router.use('/', require('./protected'));

module.exports = router;