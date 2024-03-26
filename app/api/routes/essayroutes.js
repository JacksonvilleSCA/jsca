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
    
    const uid = formData.get('uid');
    formObject.user = uid;

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
export async function GET(uid) {
  try {
      // Connect to the MongoDB database
      await connect;

      // Access the collection using the Form schema
      const formCollection = mongoose.connection.db.collection('forms');

      // Retrieve the document based on the UID
      const formData = await formCollection.findOne({ uid: uid });

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

export async function getAllForms() {
  try {
    // Connect to the MongoDB database
    await connect;

    // Access the collection using the Form schema
    const formCollection = mongoose.connection.db.collection('forms');

    // Delete the document with the specified Id
    const result = await formCollection.deleteOne({ _id: new mongoose.Types.ObjectId(formId) });

    if (result.deletedCount === 0) {
      throw new Error('Document not found');
    }

    console.log('Document deleted:', formId);
    return { success: true };

  } catch (error) {
    console.error('Error deleting form data:', error);
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

}
