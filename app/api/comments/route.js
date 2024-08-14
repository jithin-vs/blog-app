import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { findComment, findUser } from "./dbFunctions";

export const generateUniqueId = () => {
  return uuidv4();
};

export async function GET(req) {
  try {
    await connectDB();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const comments = await Comment.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        message: "Success!!",
        comments: comments
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

export async function POST(req) {

    const { blogId, comment } = await req.json();
    console.log(blogId, comment);
    console.log(req.json);
  try {
    await connectDB();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const userId = token.sub;
    const name = token.name;
    const commentFlag = await Comment.create({
      blogId,
      comment,
      author: {
        userId: userId,
        name: name,
      },
    });
    if (commentFlag) {
      return NextResponse.json(
        {
          message: "Comment added !!",
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

export async function DELETE(req) {

  const { blogId, commentId } = await req.json();
  const authorId = await findUser(blogId);
  const commentorId = await findComment(commentId);
try {
  await connectDB();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  if (token.sub !== authorId && token.sub !== commentorId) {
    return NextResponse.json({ message: 'Forbidden: You do not have permission to delete this comment' },{ status: 403 });
  }

  const commentFlag = await Comment.findOneAndDelete({_id:commentId})
  if (commentFlag) {
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


