import mongoose ,{ model, Schema, Types, Document } from "mongoose";

export interface IComment extends Document {
  blogId: Types.ObjectId,
  comment: string,
  author: {
    userId: Types.ObjectId,
    profilePic: string,
    name:string
  },
  likes:number,
}

const commentSchema:Schema = new Schema(
  {
    blogId: {
      type: Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      profilePic: {
        type: String,
        default: process.env.PROFILE_PATH,
      },
      name: {
        type: String,
        required: true,
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || model("Comment", commentSchema);

export default Comment;
