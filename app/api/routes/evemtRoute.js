"use server";
import fs from "fs/promises";
import connect from "../db/dbConnection";
import Event from "../schema/Event";
import Create from "../schema/Create";
import Admin from "../schema/Admin";
import { revalidatePath } from "next/cache";
import mongoose from 'mongoose';
import { redirect } from "next/navigation";
import { contact } from "./eventContact";
import { contactMember } from "./memberContact";



export async function GET() {
  let data = await Event.find({}).lean().exec();

  data.forEach((item, index) => {
    // console.log(typeof item.img);
    const base64Image = item.img.data.buffer.toString("base64");
    data[index].img = `data:${item.img.contentType};base64,${base64Image}`;
    item._id = item._id.toString();
    data[index]._id = data[index]._id.toString();
  });

  // console.log(data);
  return data;
}



export async function getEvent(eventData) {
  let data = await Event.findOne({ _id: eventData.id }).lean().exec();

  const base64Image = data["img"].data.buffer.toString("base64");
  data["img"] = `data:${data["img"].contentType};base64,${base64Image}`;

  data["_id"] = data["_id"].toString();

  return {props: {data: JSON.parse(JSON.stringify(data))}};
}

export async function DELETE(Data) {
  const response = await Event.deleteOne({ _id: Data.val });

  if (response) {
    console.log("ok");
  }

  revalidatePath("/Dashboard/EventHistory");
  redirect("/Dashboard/EventHistory");
}

export async function PUT(formData) {
  const data = Object.fromEntries(formData);

  const file = data.avatar;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  let active;
  if (data.activation === "Activate") {
    active = true;
  } else {
    active = false;
  }

  let res;
  if (data.avatar.size === 0) {
    res = await Event.updateOne(
      { _id: data.event },
      {
        amount: data.totalPeople,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.Location,
        details: data.details,
        active: active,
      }
    );
  } else {
    res = await Event.updateOne(
      { _id: data.event },
      {
        amount: data.totalPeople,
        img: {
          data: buffer,
          contentType: file.type,
        },
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.Location,
        details: data.details,
        active: active,
      }
    );
  }

  if (res) {
    console.log("ok");
  }

  revalidatePath("/Dashboard/EventHistory");
  redirect("/Dashboard/EventHistory");
}

export async function POST(formData) {

    const data = Object.fromEntries(formData);
    
    const adminID = await Admin.findOne({ adminID: data.adminID }).select("_id").lean().exec();

    const file = data.avatar;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const res = await Event.create({
      amount: data.totalPeople,
      img: {
        data: buffer,
        contentType: file.type,
      },
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.Location,
      details: data.details,
      admin:adminID
    });

    if (res) {
      console.log("ok");
    }
    revalidatePath("/Dashboard/EventHistory");
    redirect("/Dashboard/EventHistory");
}

export async function PostWaitList(formData) {
  console.log(formData);

 
  const eventWaitList = await Event.findOne({ _id: formData.eventID, waitlist: formData.userID });
  const eventApproveList = await Event.findOne({ _id: formData.eventID, attendees: formData.userID});

  if (eventWaitList) {
    console.log("User is already in the waitlist.");
    return {Bad: "User is already in the waitlist"}; 
  }
  if(eventApproveList){
    console.log("User is already in the approveList.");
    return {Bad: "User is already in the approve list"}; 
  }

  const res = await Event.updateOne(
    { _id: formData.eventID }, 
    { $push: { waitlist: formData.userID } } 
  );

  if (res.acknowledged) {
    console.log("Event has been updated");
    return {Good: "User has been added to wait list"}; 
  } else {
    console.log("Event has not been updated");
  }
}

export async function GetList(eventData) {
  const EventID = eventData.id;

  try {

    const objectId = new mongoose.Types.ObjectId(eventData.id); // Convert string to ObjectId

    const res = await Event.findById(objectId).select('waitlist attendees');
    
    console.log(res)
    const resTwo = await res.populate('waitlist attendees')
    console.log(resTwo);

    if (resTwo) {
      console.log("good");
      console.log(resTwo);

      // Convert _id to string
      if (resTwo._id) {
        resTwo._id = resTwo._id.toString();
      }

      // Deep copy and convert ObjectId to string for each item in waitlist
      const convertedWaitlist = resTwo.waitlist.map(item => {
        const newItem = JSON.parse(JSON.stringify(item)); // Deep copy
        // Convert ObjectId to string for _id
        if (newItem._id) {
          newItem._id = newItem._id.toString();
        }
        // Convert ObjectId to string for creates
        if (newItem.creates) {
          newItem.creates = newItem.creates.toString();
        }
        return newItem;
      });

      // Deep copy and convert ObjectId to string for each item in attendees
      const convertedAttendees = resTwo.attendees.map(attendee => {
        const newAttendee = JSON.parse(JSON.stringify(attendee)); // Deep copy
        // Convert ObjectId to string for _id
        if (newAttendee._id) {
          newAttendee._id = newAttendee._id.toString();
        }
        // Convert ObjectId to string for other fields if necessary
        // Add similar conversion logic for other ObjectId fields in attendees
        return newAttendee;
      });

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")
    console.log(convertedWaitlist)
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")

     return { waitlist: convertedWaitlist, attendees: convertedAttendees, eventID : EventID };
    } else {
      console.log("not good");
      return { waitlist: [], attendees: [] }; // Return empty arrays
    }
  } catch (error) {
    console.error("Error:", error);
    return { waitlist: [], attendees: [] }; // Return empty arrays in case of error
  }
}

export async function PostToAcceptanceList(Data){
 

      const res = await Event.updateOne(
        { _id: Data.event }, // Matching criteria
        { $push: { attendees: Data.val } } // Adding an element to the waitlist array
      );

    if(res.acknowledged){
        console.log("Member has been added to acceptance list")

        const emailObject = {email: Data.email, checkStatus: Data.check};
        contact(emailObject);

        const resTwo = await Event.updateOne(
          { _id: Data.event }, // Matching criteria
          { $pull: { waitlist: Data.val } } // Adding an element to the waitlist array
        );

          if(resTwo.acknowledged){
             console.log("Member has been removed from wait list")

          }else{
             console.log("Error has occurred removing member from wait list")
          }

    }else{
      console.log("Member has not been added to acceptance list")
    }

    
}


export async function DeleteFromWaitList(Data){
    console.log("Remove from wait list")

    const eventObjectID = new mongoose.Types.ObjectId(Data.event);
    const memberObjectID = new mongoose.Types.ObjectId(Data.val);

  const res = await Event.updateOne(
    { _id: eventObjectID }, // Matching criteria
    { $pull: { waitlist: memberObjectID } } // Removing an element from the waitlist array
  );

  if(res.acknowledged){
    console.log("Member has been removed from wait list")
  }else{
    console.log("Member has been removed from wait list")
  }

}


export async function DeleteFromAcceptanceList(Data){
  console.log("Remove from acceptance list")

  const eventObjectID = new mongoose.Types.ObjectId(Data.event);
  const memberObjectID = new mongoose.Types.ObjectId(Data.val);
  console.log(eventObjectID);
  console.log(memberObjectID);

  
const res = await Event.updateOne(
  { _id: eventObjectID }, // Matching criteria
  { $pull: { attendees: memberObjectID } } // Removing an element from the waitlist array
);

if(res.acknowledged){
  console.log("Member has been removed from acceptance list");
}else{
  console.log("Member has been removed from acceptance list");
}

}


export async function GetMemberEvents(Data){

      const eventObjectID = new mongoose.Types.ObjectId(Data.id);
      const memberObjectID = new mongoose.Types.ObjectId(Data.userID);

      const memberInfo = await Create.findOne({ _id: memberObjectID }).lean().exec();
      const eventInfo = await Event.find({ attendees: memberObjectID }).select("_id location").lean().exec();

      return {memberInfo, eventInfo};
    
}



export async function GetMoreInfoEvent(eventData) {
  const eventObjectID = new mongoose.Types.ObjectId(eventData);

  let data = await Event.findOne({ _id: eventObjectID }).lean().exec();

  const base64Image = data["img"].data.buffer.toString("base64");
  data["img"] = `data:${data["img"].contentType};base64,${base64Image}`;

  data["_id"] = data["_id"].toString();

  return data;
}


export async function GetMemberListStatus(eventData){

  const memberObjectID = new mongoose.Types.ObjectId(eventData.id);

  let data = await Event.findOne({ _id: eventData.params.id }).lean().exec(); 

  const waitListStatus = await Event.find({ waitlist: memberObjectID }).select("_id location").lean().exec();
  const approveListStatus = await Event.find({ attendees: memberObjectID }).select("_id location").lean().exec();

  const base64Image = data["img"].data.buffer.toString("base64");
  data["img"] = `data:${data["img"].contentType};base64,${base64Image}`;
  data["_id"] = data["_id"].toString();



  if(waitListStatus.length > 0){
    console.log(waitListStatus)
      console.log("wait *************************************")
  }if(approveListStatus.length > 0){
    console.log(approveListStatus)
    console.log("approve *************************************")
  }else{
    console.log("nothing *************************************")

  }



  return data;

}
export async function PostWaitListRemovalNotification(){

}

export async function PostApproveListRemovalNotification(){
  
}
