import Blog from "@/models/Blog";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET(req,{params}) {
  try {
    const blogId = params.id;
    await connectDB();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log();
    const userId = token.sub;
    const username = token.username;
    const blogs = await Blog.find({ _id: blogId }).sort({ createdAt: -1 });
    return NextResponse.json(
      {
        message: "Success!!",
        blogs: blogs,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
