const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming UserModel.js is in the same directory
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
  User.findOne({ name }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false, { message: 'Incorrect password.' });
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
