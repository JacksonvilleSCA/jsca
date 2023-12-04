'use server'
import fs from "fs/promises";
import { convertFileToBuffer } from "./convert";
import connect from "../db/dbConnection";
import Event from "../schema/Event";



export async function GET() {
  const data = await Event.find({}).lean().exec();

  data.forEach((item, index) => {
    const buffer = item.img;
    const blob = new Blob([buffer]);
    const fileOptions = {
      type: 'image/jpeg',
    };
    const imgFile = new File([blob], 'IMG', fileOptions);

    // Directly create a URL for the imgFile
    const imgURL = URL.createObjectURL(imgFile);
    // Store the URL in the data
    data[index].img = imgURL;
    data[index]._id = data[index]._id.toString();
  });

  return data;
}


export async function DELETE(){

}

export async function PUT(){

}

export async function POST(formData){
    const data = Object.fromEntries(formData);

    const file = data.avatar;
    const bytes = await file.arrayBuffer()    
    const buffer = Buffer.from(bytes);
    
  const response = await Event.create({
    amount: data.totalPeople,
    img: buffer,
    startTime: data.startTime,
    endTime: data.endTime,
    location: data.Location,
    details: data.details
  });

    if(response){
      console.log("ok");
    }

}
