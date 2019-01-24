const express = require('express');
const router = express.Router();
router.use(express.json());

router.use('/', require('./auth'));
router.use('/', require('./payments'));
router.use('/', require('./public')); 
router.use('/', require('./protected'));

module.exports = router;