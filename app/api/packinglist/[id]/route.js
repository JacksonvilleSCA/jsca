import { connect } from "mongoose";
import Packlist from "../../schema/packinglist";
import { NextResponse } from "next/server";
//for updates use PUT
export async function PUT(req, {params}){
    const {id} = params;
    const {newDescription: description} = req.json()
    await connect(); 
    await Packlist.findByIdAndUpdate(id, {description});
    return NextResponse.json({message: "Item updated"}, {status: 200});
}

export async function GET(req, {params}){
    const { id } = params;
    await connect();
    const item = await Packlist.findOne({_id: id});
    return NextResponse.json({item},{status: 200} );
}