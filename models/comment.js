const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  author: String,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
