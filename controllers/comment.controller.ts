import { connectDB } from "@/lib/mongodb";
import Blog, { IBlog } from "@/models/Blog";
import Comment ,{ IComment } from "@/models/Comment";

await connectDB();

export const findBlogAuthor = async (userId: string):Promise<string|null> => {
    const user: IBlog | null = await Blog.findOne({ _id: userId });
    if (user) return user.author.userId.toString();
    return null;
};
  
export async function getComments():Promise <IComment[]> {
    const comments:IComment[]|null = await Comment.find().sort({
        createdAt: -1,
    });
    
    return comments;
}

  export const findCommentAuthor = async (
    commentId: string
  ): Promise<string | null> => {
    const comment: IComment | null = await Comment.findOne({ _id: commentId });
    if (comment) return comment.author.userId.toString();
    return null;
  };
  
  export const createComment = async (
    blogId: string,
    comment: string,
    userId: string,
    name: string
  ): Promise<IComment | null> => {
    const commentFlag: IComment | null = await Comment.create({
      blogId,
      comment,
      author: {
        userId: userId,
        name: name,
      },
    });
    if (commentFlag) {
      await Blog.findByIdAndUpdate(commentFlag.blogId, {
        $inc: { comments: 1 },
      });
      return commentFlag;
    }
    return null;
  };
  
  export const deleteComment = async (commentId: string):Promise<IComment | null> => {
    const deleteFlag = await Comment.findOneAndDelete({ _id: commentId });
    if (deleteFlag) {
      return deleteFlag;
    }
    return null;
  }