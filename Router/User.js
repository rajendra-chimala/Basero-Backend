const express = require('express');
const router = express.Router();
const { login, logout, register, getAll, edit_profile } = require('../Controller/User');
const upload = require('../Middlewares/Uploads');
const adminAuthMiddleware = require('../Middlewares/Auth');

router.post('/register', register);
router.post('/login', login);
router.put('/edit_profile', adminAuthMiddleware, upload.single("profilePicture"), edit_profile);
router.get('/logout', logout);
router.get('/all', getAll);

module.exports = router;
