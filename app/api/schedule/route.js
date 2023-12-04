"server action"
import { NextResponse } from "next/server"
import connect from "../db/dbConnection"
import Itinerary from "../schema/Itinerary"


export async function POST(req){
    const{title, startDate, endDate, day, time, activity} = await req.json();

    console.log("title", title );
    console.log("start date", startDate);
    console.log("end date", endDate );
    console.log("schedule", day );
    console.log("schedule", time );
    console.log("schedule", activity );

    //what does this do?? this msg is what we expect in itinerary
    return NextResponse.json({msg: ['hi from schedule route']});
}

//attempt at creating a fetch post api req
/*
export default async function postReq(data){
    try{
        const url = await fetch('api/Getit' ,{
        method: "POST",
        header: {
            'Content-type': 'applicaiton/json',
        },
        body: {
            body: JSON.stringify(data,)
        },
    )};
    const result = await response.json();
    console.log(result)
    }
    catch(error){
        console.log(error);
    }
}*/