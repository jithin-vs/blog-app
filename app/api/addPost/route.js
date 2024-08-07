import { NextResponse } from "next/server";

const { GET } = require("../auth/[...nextauth]/route")

export async function POST(req){
    const postData = await req.json();
    console.log(postData);
    return NextResponse.json({message:"success!!"},{status:201});
}