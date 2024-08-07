import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  postTime: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
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
  nLikes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Comment = mongoose.models.Like || mongoose.model('Comment', commentSchema);

export default Comment;
