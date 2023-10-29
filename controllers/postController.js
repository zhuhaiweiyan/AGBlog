const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getSinglePost = async function(req, res) {
  const requestedPostId = req.params.postId;
  try {
    const post = await Post.findById(requestedPostId);
    const comments = await Comment.find({ postId: requestedPostId });
    if (post) {
      res.render("post", {
        title: post.title,
        author: post.author,
        content: post.content,
        comments: comments,
        timestamp: post.timestamp
      });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
