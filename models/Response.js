const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  response: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Response', ResponseSchema);
