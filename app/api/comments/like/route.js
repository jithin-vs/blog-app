import { connectDB } from "@/lib/mongodb";
import Like from "@/models/Like";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {

  const { referenceId, onModel } = req.json();
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;
    const name = token.name;
    const existingLike = await Like.findOne({
      referenceId: referenceId,
      onModel: onModel,
      "author.userId": userId,
    });

    if (existingLike) {
      await existingLike.deleteOne();
      return NextResponse.json({ message: "Unliked successfully" } , { status: 200 });
    }

    const newLike = new Like({
      referenceId: referenceId,
      onModel: onModel,
      author: {
        userId: userId,
        name: name,
      },
    });

    await newLike.save();

    return NextResponse.json({ message: "Liked successfully" } , { status: 200 });
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json({ message: "Internal Server Error" } , { status: 500 });
  }
}
