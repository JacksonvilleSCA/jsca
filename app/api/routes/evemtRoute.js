'use server'
import fs from "fs/promises";
import connect from "../db/dbConnection";
import Event from "../schema/Event";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/dist/server/api-utils";
import {redirect} from 'next/navigation'



// export async function GETT() {
//   const data = await Event.find({}).lean().exec();

//   data.forEach((item, index) => {
//     const buffer = item.img;
//     const blob = new Blob([buffer]);
//     const fileOptions = {
//       type: 'image/jpeg',
//     };
//     const imgFile = new File([blob], 'IMG', fileOptions);

//     // Directly create a URL for the imgFile
//     const imgURL = URL.createObjectURL(imgFile);
//     // Store the URL in the data
//     data[index].img = imgURL;
//     data[index]._id = data[index]._id.toString();
//   });

//   return data;
// }

export async function GET() {

  // await connect();

  let data = await Event.find({}).lean().exec();

  data.forEach((item,index) => {
    if (item.img && Buffer.isBuffer(item.img)) {
      const base64Image = item.img.toString('base64');
      // item.img = `data:image/jpeg;base64,${base64Image}`;
      data[index].img = `data:image/jpeg;base64,${base64Image}`;
    }
    item._id = item._id.toString();
    data[index]._id = data[index]._id.toString();
  });

  return data;
}

export async function getEvent(eventData){

    //  await connect();
    let data = await Event.findOne({_id: eventData.id}).lean().exec();

    data['_id'] = data['_id'].toString();
    let base64Image = data['img'].toString('base64');
    data['img'] =  `data:image/jpeg;base64,${base64Image}`;
  
  return data 
}

export async function DELETE(Data){

    // console.log(Data.val);

    const response = await Event.deleteOne({_id: Data.val})

    if(response){
      console.log("ok");
    }

    revalidatePath('/Dashboard/EventHistory');
    redirect('/Dashboard/EventHistory')

}

export async function PUT(formData){
  // await connect();
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
    img: buffer,
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

export async function POST(formData){
  // await connect();
    const data = Object.fromEntries(formData);

    const file = data.avatar;
    const bytes = await file.arrayBuffer()    
    const buffer = Buffer.from(bytes);

  const res = await Event.create({
    amount: data.totalPeople,
    img: buffer,
    startTime: data.startTime,
    endTime: data.endTime,
    location: data.Location,
    details: data.details
  });

  // console.log(res + "+++++++++");

    if(res.ok){
      console.log("ok");
    }

   revalidatePath('/Dashboard/EventHistory')
   redirect('/Dashboard/EventHistory')


  

}
