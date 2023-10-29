// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

//Import security
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");

// Initialize the Express app
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use body-parser and express.static middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser:true});

// Session configuration
app.use(session({
  secret: "your secret key",
  resave: false,
  saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//verify identity
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Use imported routes
app.use('/', homeRoutes);
app.use('/posts', postRoutes);
app.use('/', authRoutes);



// Start the server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
