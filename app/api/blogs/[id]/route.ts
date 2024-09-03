import Blog from "@/models/Blog";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { findBlog } from "@/controllers/blog.controller";

export async function GET(req: NextRequest, { params }:{params:{id:string}}) {
  try {
    const {id:blogId} = params;
    await connectDB();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const blog = await findBlog(blogId)
    return NextResponse.json(
      {
        message: "Success!!",
        blogs: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error finding blog post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
