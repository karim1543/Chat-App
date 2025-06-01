const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, async (req, res) => {
  const keyword = req.query.search;
  if (!keyword) return res.json([]);

  try {
    const users = await User.find({
      username: { $regex: keyword, $options: 'i' },
      _id: { $ne: req.user._id },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;