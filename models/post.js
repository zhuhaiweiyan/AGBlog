const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"]
  },
  content: String,
  author: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
