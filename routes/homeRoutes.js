const express = require('express');
const { getHomePage, getAboutPage, getContactPage, getComposePage, postComposePage  } = require('../controllers/homeController');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated) {
      return next();
    } else {
      res.redirect('/login');
    }
  }


const router = express.Router();

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);
router.get("/compose", ensureAuthenticated, getComposePage);
router.post("/compose", ensureAuthenticated, postComposePage);

module.exports = router;
