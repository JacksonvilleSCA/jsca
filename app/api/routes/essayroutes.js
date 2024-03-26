"use server"

import connect from "../db/dbConnection";
import mongoose from "mongoose"; 
import Event from "../schema/Event";
import Form from "../schema/Form";
import { ObjectId } from 'mongodb';
import { FormContact } from "./formContact";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function POST(formData){

const data = Object.fromEntries(formData);
console.log("- - - - - - - - - - -- - - - -- ")
console.log(data)
console.log("- - - - - - - - - - -- - - - -- ")

try {
    // Connect to the MongoDB database
    await connect;

    // Access the collection using the Form schema
    const formCollection = mongoose.connection.db.collection('forms'); 

    // Create an empty formObject
    const formObject = {};

    // Iterate over form data and populate the formObject
    for (const [name, value] of formData.entries()) {
      formObject[name] = value;
    }
    // Create a new document based on the Form schema
    const newForm = new Form(formObject);

    // Convert Mongoose model instance to plain object
    const formPlainObject = newForm.toObject();

    // Insert the new document into the collection
    const result = await formCollection.insertOne(formPlainObject);

    console.log('Document inserted:', result.insertedId);

  } catch (error) {
    console.error('Error handling POST request:', error);
    return { success: false, error: error.message };
  }
}
// GET endpoint to retrieve form data
export async function GET() {
  try {
    // Connect to the MongoDB database
    await connect;

    // Access the collection using the Form schema
    const formCollection = mongoose.connection.db.collection('forms');

    // Retrieve all documents from the collection
    const formData = await formCollection.find({}).toArray();

    return formData; // Return the retrieved form data
  } catch (error) {
    console.error('Error retrieving form data:', error);
    throw error; // Throw the error to handle it in the calling function
  }
}


export async function getAllFormsTwo(check) {
  console.log(check)
  try {
      // Connect to the MongoDB database
      await connect;

      // Access the collection using the Form schema
      const formCollection = mongoose.connection.db.collection('forms'); 

      // Fetch documents from the collection where active is null
      let forms;
      if(check === "one"){
        forms = await formCollection.find({ active: null }).toArray();
      }if(check === "two"){
        forms = await formCollection.find({ active: { $in: [true, false] } }).toArray();
      }

      // Convert objects with ObjectId to plain JavaScript objects
      const formattedForms = forms.map(form => {
          // Convert event property to a plain JavaScript object
          const formattedEvent = form.event instanceof ObjectId ? form.event.toString() : form.event;

          // Return the updated form object
          return {
              ...form,
              event: formattedEvent
          };
      });

      return formattedForms;
  } catch (error) {
      console.error('Error fetching forms:', error);
      throw error;
  }
}


// export async function getAllForms() {
//   try {
//       // Connect to the MongoDB database
//       await connect;

//       // Access the collection using the Form schema
//       const formCollection = mongoose.connection.db.collection('forms'); 

//       // Fetch all documents from the collection
//       const forms = await formCollection.find({}).toArray();

//       console.log(forms);
//       return forms;
//   } catch (error) {
//       console.error('Error fetching forms:', error);
//       throw error;
//   }
// }


// export async function getAllForms() {
//   try {
//     // Connect to the MongoDB database
//     await connect;

//     // Access the collection using the Form schema
//     const formCollection = mongoose.connection.db.collection('forms'); 

//     // Fetch all documents from the collection
//     const forms = await formCollection.find({}).toArray();

//     // Convert objects with ObjectId properties to plain JavaScript objects
//     const formattedForms = forms.map(form => {
//       // Convert event property to a plain JavaScript object
//       const formattedEvent = form.event instanceof ObjectId ? form.event.toString() : form.event;

//       // Return the updated form object
//       return {
//         ...form,
//         event: formattedEvent
//       };
//     });

//     console.log(formattedForms);
//     return formattedForms;
//   } catch (error) {
//     console.error('Error fetching forms:', error);
//     throw error;
//   }
// }


export async function getAllForms() {
  try {
    // Connect to the MongoDB database
    await connect;

    // Access the collection using the Form schema
    const formCollection = mongoose.connection.db.collection('forms'); 

    // Fetch all documents from the collection
    const forms = await formCollection.find({}).toArray();

    // Convert objects with ObjectId properties to plain JavaScript objects
    const formattedForms = forms.map(form => {
      // Convert event property to a plain JavaScript object
      const formattedEvent = form.event instanceof ObjectId ? form.event.toString() : form.event;

      // Convert student property to a plain JavaScript object
      const formattedStudent = form.student instanceof ObjectId ? form.student.toString() : form.student;

      // Return the updated form object
      return {
        ...form,
        event: formattedEvent,
        student: formattedStudent
      };
    });

    console.log(formattedForms);
    return formattedForms;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
}



export async function PostToEvent(Data){

  console.log(Data)

  const res = await Event.updateOne(
    { _id: Data.event }, // Matching criteria
    { $push: { attendees: Data.val } } // Adding an element to the waitlist array
  );

if(res.acknowledged){
    console.log("Member has been added to acceptance list")

    const emailObject = {email: Data.email, checkStatus: Data.check};
    FormContact(emailObject);

    const resTwo = await Form.updateOne(
      { _id: Data.form }, // Matching criteria
      { $set: { active: true } }
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


export async function RemoveFromEvent(Data){

  console.log(Data)

  const emailObject = {email: Data.email, checkStatus: Data.check};
  FormContact(emailObject);
  
  const res = await Form.updateOne(
    { _id: Data.form }, // Matching criteria
    { $set: { active: false } }
  );


  if(res.acknowledged){
    console.log("Member has been removed from wait list")

    revalidatePath("/adminForms");
    redirect("/adminForms");

  }else{
    console.log("Member has been removed from wait list")
  }

}



export async function checkFormCreation(data){
  console.log(data);

 let res = await Form.exists({ event: data.event }).lean().exec();
 let resTwo = await Form.exists({ student: data.uid }).lean().exec();
  console.log(res)
  console.log(resTwo)

        if(res && resTwo){
          revalidatePath("/studentViewForm");
          redirect("/studentViewForm");
      }else{
        console.log('no')
      }

    // if(){

    // }else{

    // }
}