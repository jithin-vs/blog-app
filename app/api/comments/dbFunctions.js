import Comment from "@/models/Comment";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

await connectDB();

export const findUser = async (userId) => {
    const user = await Blog.findOne({ _id: userId });
    if (user) return user.author.userId.toString();
    return null;
}
  
export const findComment = async (commentId) => {
    const comment = await Comment.findOne({ _id: commentId });
    if (comment) return comment.author.userId.toString();
    return null;
  }