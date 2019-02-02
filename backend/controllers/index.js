const express = require('express');
const router = express.Router();
router.use(express.json());

router.use('/', require('./auth'));
router.use('/', require('./payments'));
router.use('/', require('./public')); 
router.use('/', require('./protected/admin/cocktails'));
router.use('/', require('./protected/admin/users'));
router.use('/', require('./protected/user/updatecard'));

module.exports = router;