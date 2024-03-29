"use server";
import { NextResponse } from "next/server";
import connect from "../db/dbConnection";
import Itinerary from "../schema/Itinerary";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function POST(formData) {
  "use server";
  const data = formData;
  try {
    // await connect();
    const newItinerary = new Itinerary({
      eventId: formData.eventId,
      title: formData.title,
      schedule: formData.schedule,
    });

    await newItinerary.save();
    console.log("Itinerary saved:", newItinerary);
  } catch (error) {
    console.error("Error creating new itinerary:", error);
    throw new Error("Failed to create the itinerary");
  }
}

export async function getServerSideProps() {
  try {
    const result = await Itinerary.find();
    const itineraries = result.map((doc) => {
      const itinerary = doc.toObject();
      itinerary._id = itinerary._id.toString();
      return itinerary;
    });

    return { props: { itineraries: JSON.parse(JSON.stringify(itineraries)) } };
  } catch (error) {
    throw new Error("Failed to get itinerary");
  }
}

//Get by id
export async function getEventItinerary(eventId) {
  try {
    const result = await Itinerary.findOne({ eventId: eventId.id })
      .populate("eventId")
      .lean()
      .exec();

    if (!result) {
      return { props: { itinerary: [] } };
    }

    const itinerary = JSON.parse(JSON.stringify(result));
    itinerary._id = itinerary._id.toString();

    if (itinerary.eventId && itinerary.eventId._id) {
      itinerary.eventId._id = itinerary.eventId._id.toString();
    }

    return { props: { itinerary: JSON.parse(JSON.stringify(itinerary)) } };
  } catch (error) {
    throw new Error("Failed to get itinerary");
  }
}

export async function getItineraryById(eventId) {
  try {
    const result = await Itinerary.findOne({ eventId: eventId })
      .populate("eventId")
      .lean()
      .exec();

    if (!result) {
      return { props: { itinerary: [] } };
    }

    const itinerary = JSON.parse(JSON.stringify(result));

    return itinerary;
  } catch (error) {
    throw new Error("Failed to get itinerary");
  }
}

//delete by id
export async function DeleteItinerary(eventId) {
  try {
    const data = await Itinerary.deleteOne({ eventId: eventId });

    revalidatePath(`/EventHistory/${eventId}/temp`);
    redirect(`/EventHistory/${eventId}/temp`);
  } catch (error) {
    throw Error("Failed to delete");
  }
}

//update itinerary
export async function UpdateItinerary(eventId, formData) {
  try {
    const data = await Itinerary.updateOne(
      { eventId: eventId },
      {
        title: formData.title,
        schedule: formData.schedule,
      }
    );
  } catch (error) {
    throw new Error("Failed to update");
  }
}
