const express = require('express');
const { createOrGetChat, getUserChats } = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrGetChat);
router.get('/', protect, getUserChats);

module.exports = router;