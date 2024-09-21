const express = require('express');
const { createUserAndAddress } = require('../controllers/userController');

const router = express.Router();

router.post('/register', createUserAndAddress);

module.exports = router;
