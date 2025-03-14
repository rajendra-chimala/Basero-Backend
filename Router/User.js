// routes/authRoutes.js
const express =require('express');
const router = express.Router();

const { login, logout, register, getAll } = require('../Controller/User');


router.post('/register', register);


router.post('/login', login);


router.get('/logout', logout);
router.get('/all',getAll)

module.exports = router;