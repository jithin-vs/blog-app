import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, username, password } = await req.json();
    await connectDB();

    //user existing check
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    //user creation
    const hashedPassWord = await hash(password, 10);
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassWord,
    });
    if (user) {
      return NextResponse.json({ message: "success!!" }, { status: 200 });
    }
    return null;
  } catch (error) {
    console.log("error:", error);
    if (error.name === "ValidationError") {
      const errors = {};

      for (const [field, { message }] of Object.entries(error.errors)) {
        errors[field] = message;
      }

      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: `error:${error}` }, { status: 500 });
  }
}
