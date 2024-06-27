const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['candidate', 'reviewer'],
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Register the User schema with Mongoose and export the model
module.exports = mongoose.model('User', UserSchema);
