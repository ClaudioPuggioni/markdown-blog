const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author_name: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
