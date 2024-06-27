const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

router.get('/:candidateId', async (req, res) => {
  const candidateId = req.params.candidateId;

  try {
    const responses = await Response.find({ candidateId });
    let easyCount = 0, mediumCount = 0, hardCount = 0;
    let easyTotal = 0, mediumTotal = 0, hardTotal = 0;

    responses.forEach(response => {
      switch(response.difficulty) {
        case 'easy':
          easyCount++;
          easyTotal += response.rating;
          break;
        case 'medium':
          mediumCount++;
          mediumTotal += response.rating;
          break;
        case 'hard':
          hardCount++;
          hardTotal += response.rating;
          break;
      }
    });

    const totalWeight = (easyCount * 1) + (mediumCount * 2) + (hardCount * 3);
    const totalRating = (easyTotal * 1) + (mediumTotal * 2) + (hardTotal * 3);
    const averageRating = totalRating / totalWeight;

    res.json({ averageRating });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
