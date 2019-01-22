const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));
router.use('/', require('./public')); // this route needs to be before the protected route
// router.use('/', require('./auth'));
router.use('/', require('./protected'));

module.exports = router;