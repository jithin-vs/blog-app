import Blog from "@/models/Blog";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/mongodb";
import { createBlog } from "@/controllers/blog.controller";

export const generateUniqueId = () => {
  return uuidv4();
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const imageUrl = (formData.get("imageUrl") as string) || null;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub as string;
    const name = token.name as string;
    const profilePic = (token.profilePic as string) || "";
    const blogData = new Blog({
      title,
      content,
      author: {
        userId,
        name: name,
        profilePic,
      },
      imageUrl: imageUrl,
    });
    const blog = await createBlog(blogData);

    return NextResponse.json({ message: "Success!!",blog:blog}, { status: 201 });
  } catch (error) {
    console.log("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
