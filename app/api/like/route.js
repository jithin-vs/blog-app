import { connectDB } from "@/lib/mongodb";
import Like from "@/models/Like";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  const { referenceId, onModel } = await req.json();
  // console.log(referenceId, onModel);
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
    console.log(existingLike);
    if (existingLike) {
      await existingLike.deleteOne();
      return NextResponse.json(
        { message: "Unliked successfully", isLiked: false },
        { status: 200 }
      );
    }

    const newLike = new Like({
      referenceId: referenceId,
      onModel: onModel,
      author: {
        userId: userId,
        name: name,
      },
    });

    const like = await newLike.save();
    if (like) {
      await Blog.findByIdAndUpdate(like.referenceId, { $inc: { likes: 1 } });
      return NextResponse.json(
        { message: "Liked successfully", isLiked:true },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Cannot save like" }, { status: 400 });
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
