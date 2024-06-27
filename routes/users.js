const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  User.find().then(users => res.json(users)).catch(err => res.status(400).json(err));
});

module.exports = router;
