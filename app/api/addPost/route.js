import Blog from "@/models/Blog";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { connectDB } from "@/lib/mongodb";

export const generateUniqueId = () => {
  return uuidv4();
};

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const image = formData.get("image") || null;
    const title = formData.get("title");
    const content = formData.get("content");
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;
    const username = token.username;
    const profilePic = token.profilePic || "";
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + generateUniqueId() + "-" + image.name;

    const fileDir = `public/uploads/${username}/`;
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    const filePath = path.join(fileDir, filename);
    await writeFile(path.join(process.cwd(), filePath), buffer);
    console.log("success!!");

    await Blog.create({
      title,
      content,
      author: {
        userId,
        name: username,
        profilePic,
      },
      imageUrl: filePath,
    });
    return NextResponse.json({ message: "Success!!" }, { status: 201 });
  } catch (error) {
    console.log("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
