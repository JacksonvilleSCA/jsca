import connect from "../db/dbConnection";
import Packlist from "../schema/packinglist";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {description} = await req.json();
    await connect();
    await Packlist.create({description});
    return NextResponse.json({message: "topic created"}, {status: 201});

}

//get method
export async function GET(){
    await connect();
    const packlist = await Packlist.find();
    return NextResponse.json({ packlist})
} 

export async function DELETE(req){
    const id = request.nextUrl.searchParams.get("id");
    await connect();
    await Packlist.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted"}, {status: 200})
}