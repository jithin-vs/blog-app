import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/mongodb";
import { createComment, deleteComment, findBlogAuthor,findCommentAuthor, getComments } from "@/controllers/comment.controller";

export const generateUniqueId = () => {
  return uuidv4();
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const comments = getComments();
    return NextResponse.json(
      {
        message: "Success!!",
        comments: comments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { blogId, comment }: { blogId: string; comment: string } =
    await req.json();
  console.log(blogId, comment);
  console.log(req.json);
  try {
    await connectDB();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub as string;
    const name = token.name as string;
    const commentFlag = await createComment(userId, comment, blogId, name);
    if (commentFlag) {
      return NextResponse.json(
        {
          message: "Comment added !!",
          comment: commentFlag,
        },
        { status: 200 }
      );
    }
    return null;
  } catch (error) {
    console.log("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { blogId, commentId }: { blogId: string; commentId: string } =
    await req.json();
  const authorId = await findBlogAuthor(blogId);
  const commentorId = await findCommentAuthor(commentId);
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (token.sub !== authorId && token.sub !== commentorId) {
      return NextResponse.json(
        {
          message:
            "Forbidden: You do not have permission to delete this comment",
        },
        { status: 403 }
      );
    }

    const deleteFlag = await deleteComment(commentId);
    if (deleteFlag) {
      return NextResponse.json(
        {
          message: "Comment deleted !!",
        },
        { status: 200 }
      );
    }
    return null;
  } catch (error) {
    console.log("Error deleting comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
