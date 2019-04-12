const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    "mongodb://volkanarisli:kartaca123@ds135796.mlab.com:35796/kartaca",
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(require('./middlewares/allow_requests'));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

app.use("/", require("./routes/convert"));
app.use("/users", require("./routes/users"));

app.listen(3000 ,function(){
    console.log("Server is Running on 3000");
});
   

