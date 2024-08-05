import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcryptjs";
import {  NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, username, password } = await req.json();
        await connectDB();

        //user existing check
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: 'User with this email already exists.' });
        }
    
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
          return res.status(400).json({ message: 'Username already taken.' });
        }

        //user creation
        const hashedPassWord = await hash(password, 10);
        User.create({ name, email, username, password: hashedPassWord });
        return NextResponse.json({ message: "success!!" }, { status: 200 });
        
    } catch (e) {
        console.log("error:", e);
        return NextResponse.json({ message:`error:${e}`},{status:500});
    }
}