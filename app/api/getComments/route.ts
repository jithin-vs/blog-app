import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getComments } from "./dbFunctions";

export async function GET(req: NextRequest) {
  try {
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
