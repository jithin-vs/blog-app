import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { PROFILE_PATH } from process.env; 

export const generateUniqueId = () => {
  return uuidv4();
};

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
