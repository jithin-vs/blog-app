import mongoose, { model, Document, Schema, Types } from "mongoose";

export interface IBlog extends Document {
  title: Types.ObjectId;
  content: string;
  postTime: Date;
  likes: number;
  comments: number;
  author: {
    userId: Types.ObjectId;
    name: string;
    profilePic: string;
  };
  imageUrl: string;
}

const blogSchema = new Schema(
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
    comments: {
      type: Number,
      default: 0,
    },
    author: {
      userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      profilePic: {
        type: String,
        default: "",
      },
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || model("Blog", blogSchema);

export default Blog;
