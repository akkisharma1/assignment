const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/ratings', require('./routes/ratings'));
app.use('/api/skills', require('./routes/skills'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
