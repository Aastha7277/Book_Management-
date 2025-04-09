const express = require('express');
const router = express.Router();

router.use('/user', require('./auth'));
router.use('/book', require('./books'));

module.exports = router;
