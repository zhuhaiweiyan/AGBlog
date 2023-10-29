const Post = require('../models/post');
const homeStartingContent = "I am An Ge! Welcome to my blog!";
const aboutContent = "This is a personal blog!";
const contactContent = "my phone: 123-4567  my email: 123456@gmail.com";

exports.getHomePage = async function(req, res) {
  try {
    const posts = await Post.find({});
    res.render("home", { startingContent: homeStartingContent, posts: posts, isAuthenticated: req.isAuthenticated() });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.getAboutPage = function(req, res) {
  res.render("about", { aboutContent: aboutContent });
};

exports.getContactPage = function(req, res) {
  res.render("contact", { contactContent: contactContent });
};

exports.getComposePage = function(req, res) {
  res.render("compose", { isAuthenticated: req.isAuthenticated() });
};

exports.postComposePage = async function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    author: req.body.postAuthor,
    content: req.body.postBody
  });
  try {
    await post.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/compose");
  }
};
