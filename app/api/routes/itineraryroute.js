"use server"
import { NextResponse } from "next/server"
import connect from "../db/dbConnection"
import Itinerary from "../schema/Itinerary"


export async function POST(formData){
    "use server"
    const data = (formData)
    console.log(data)
    "use server";

    try {
        await connect();
        const newItinerary = new Itinerary({
            title: formData.title,
            duration: {
                startDate: formData.duration.startDate,
                endDate: formData.duration.endDate,
            },
            schedule: formData.schedule,
        });

        await newItinerary.save();
        console.log('Itinerary saved:', newItinerary);
    } catch (error) {
        console.error("Error creating new itinerary:", error);
        throw new Error('Failed to create the itinerary');
    }
}




// export async function POST(req){
//     const{title, startDate, endDate, day, time, activity} = await req.json();

//     console.log("title", title );
//     console.log("start date", startDate);
//     console.log("end date", endDate );
//     console.log("schedule", day );
//     console.log("schedule", time );
//     console.log("schedule", activity );

//     //what does this do?? this msg is what we expect in itinerary
//     return NextResponse.json({msg: ['hi from schedule route']});
// }
