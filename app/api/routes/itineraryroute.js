"use server"
import { NextResponse } from "next/server"
import connect from "../db/dbConnection"
import Itinerary from "../schema/Itinerary"


export async function POST(formData){
    "use server"
    const data = (formData)
    try {
        // await connect();
        const newItinerary = new Itinerary({
            // eventId: formData.eventId,
            title: formData.title,
            schedule: formData.schedule,
          
        });

        await newItinerary.save();
        console.log('Itinerary saved:', newItinerary);
    } catch (error) {
        console.error("Error creating new itinerary:", error);
        throw new Error('Failed to create the itinerary');
    }
}

export async function getServerSideProps(){
    const result = await Itinerary.find();
    const itineraries = result.map((doc) => {
        const itinerary = doc.toObject();
        itinerary._id = itinerary._id.toString();
        return itinerary;
    })

    return { props: { itineraries: JSON.parse(JSON.stringify(itineraries)) } };
}