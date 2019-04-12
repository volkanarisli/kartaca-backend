const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const User = require('../models/User');
const {forwardAuthenticated} = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const {name, email, password, password2} = req.body;

  User.findOne({email: email}).then(user => {
      if (user) {
        res.send({status: 404})
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        newUser.save()
          .then(
            res.send({status: 200})
          )
          .catch(err => {
            console.log(err)
            res.send({status: 404})
          });
      }
    }
  )
})

// Login
router.post('/login', (req, res, next) => {
  let {email, password} = req.body;

  User.findOne({email: email, password: password})
    .then((user) => {
      res.send({status: 200, email: user.email, name: user.name})
    })
    .catch(() => {
      res.send({status: 404})
    })
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;