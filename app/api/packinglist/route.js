import { NextResponse } from "next/server";
import connect from "../db/dbConnection";
import Packlist from "../schema/packinglist";

export async function POST(req) {
    const {description} = await req.json();
    await connect();
    await Packlist.create({description});
    return NextResponse.json({message: "topic created"}, {status: 201});

}