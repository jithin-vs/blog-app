import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
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
    omments: {
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
        default:'',
      },
      name: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      default: '', 
    },
  },
  { timestamps: true }
); 

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
