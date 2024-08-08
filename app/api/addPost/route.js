// app/api/addPost/route.js

import Blog from "@/models/Blog";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = () => {
  return uuidv4();
};

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;  
    const username = token.username;  
    const profilePic = token.profilePic || ""; 
    await Blog.create({
      title,
      content,
      author: {
        userId,
        name: username,
        profilePic,
      },
    });

    return NextResponse.json({ message: "Success!!" }, { status: 201 });
  } catch (error) {
    console.log("Error creating blog post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
