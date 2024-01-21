'use server'
import fs from "fs/promises";
import connect from "../db/dbConnection";
import Event from "../schema/Event";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/dist/server/api-utils";
import {redirect} from 'next/navigation'

export async function GET() {
  let data = await Event.find({}).lean().exec();

  data.forEach((item, index) => {
    console.log(typeof item.img);
    const base64Image = item.img.data.buffer.toString('base64');
    data[index].img = `data:${item.img.contentType};base64,${base64Image}`;
    item._id = item._id.toString();
    data[index]._id = data[index]._id.toString();
  });

  // console.log(data);
  return data;
}


export async function getEvent(eventData){

    let data = await Event.findOne({_id: eventData.id}).lean().exec();
    const base64Image = data['img'].data.buffer.toString('base64');
    data['img'] = `data:${data['img'].contentType};base64,${base64Image}`;
    data['_id'] = data['_id'].toString();
  
  return data 
}

export async function DELETE(Data){
    const response = await Event.deleteOne({_id: Data.val})

    if(response){
      console.log("ok");
    }

    revalidatePath('/Dashboard/EventHistory');
    redirect('/Dashboard/EventHistory')

}

export async function PUT(formData){

  const data = Object.fromEntries(formData);
  const file = data.avatar;
  const bytes = await file.arrayBuffer()    
  const buffer = Buffer.from(bytes);


  let active;
  if(data.activation === "Activate"){
     active = true;
  }else{
     active = false;
  }

  const res = await Event.updateOne({_id: data.event},{
    amount: data.totalPeople,
    img: {
      data: buffer,
      contentType: file.type,
    },
    startTime: data.startTime,
    endTime: data.endTime,
    location: data.Location,
    details: data.details,
    active: active
  })

  if(res){
    console.log("ok");
  }

  revalidatePath('/Dashboard/EventHistory');
  redirect('/Dashboard/EventHistory')

}

export async function POST(formData) {
  try {
    const data = Object.fromEntries(formData);

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
    });

    if (res.ok) {
      console.log("Event created successfully");
    }

    revalidatePath('/Dashboard/EventHistory');
    redirect('/Dashboard/EventHistory');
  } catch (error) {
    console.error("Error creating event:", error);
    // Handle the error appropriately (e.g., send an error response)
  }
}

