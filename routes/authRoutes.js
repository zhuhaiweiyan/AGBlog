const express = require('express');
const passport = require('passport');
const User = require("../models/user");

const router = express.Router();

// Register route
router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      req.login(user, function(err) {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          res.redirect("/");
        }
      });
    }
  });
});

// Login route
router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

// Logout route
router.get("/logout", function(req, res){
  req.logout(function(err){
    if(err){
      console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
