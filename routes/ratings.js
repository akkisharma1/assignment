const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

router.post('/rate', (req, res) => {
  const { candidateId, questionId, response, rating } = req.body;
  const newResponse = new Response({ candidateId, questionId, response, rating });

  newResponse.save()
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
