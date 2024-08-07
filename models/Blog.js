import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  postTime: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  numComments: {
    type: Number,
    default: 0,
  },
  author: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    profilePic: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });  

const Blog = mongoose.models.Like || mongoose.model('Blog', blogSchema);

export default Blog;
