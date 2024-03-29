"use server"

import connect from "../db/dbConnection";
import mongoose from "mongoose"; 
import Event from "../schema/Event";
import Form from "../schema/Form";
import { ObjectId } from 'mongodb';
import { FormContact } from "./formContact";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import form from "../schema/Form";
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
  try {
    // Connect to the MongoDB database
    await connect;

    // Access the collection using the Form schema
    const formCollection = mongoose.connection.db.collection('forms');

    // Fetch documents from the collection based on the check value
    let forms;
    if (check.value === "one") {
      forms = await formCollection.find({ active: null }).toArray();
    } else if (check.value === "two") {
      forms = await formCollection.find({ active: { $in: [true, false] } }).toArray();
    }

    // Convert objects with ObjectId to plain JavaScript objects
    const formattedForms = forms.map(form => {
      // Iterate over each field of the form
      const formattedFields = {};
      Object.entries(form).forEach(([key, value]) => {
        // Check if the field is an ObjectId instance, if so, convert it to string
        formattedFields[key] = value instanceof ObjectId ? value.toString() : value;
      });
      return formattedFields;
    });

    console.log(formattedForms);

    // Filter forms based on eventID if necessary
    if (check.value === "two" && check.eventID[0]) {
      const filteredForms = formattedForms.filter(form => form.event === check.eventID[0]);
      console.log(filteredForms);
      return filteredForms;
    }

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

    //
    const forms = await formCollection.find({}).toArray();
    
        // Convert objects with ObjectId to plain JavaScript objects
        const formattedForms = forms.map(form => {
          // Iterate over each field of the form
          const formattedFields = {};
          Object.entries(form).forEach(([key, value]) => {
            // Check if the field is an ObjectId instance, if so, convert it to string
            formattedFields[key] = value instanceof ObjectId ? value.toString() : value;
          });
          return formattedFields;
        });

    return formattedForms;

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


// export async function checkFormCreation(data){
//   console.log(data);

//  let res = await Form.exists({ event: data.event }).lean().exec();
//  let resTwo = await Form.exists({ student: data.uid }).lean().exec();

//         if(res && resTwo){
//           revalidatePath("/studentViewForm");
//           redirect("/studentViewForm");
//       }else{
//         redirect(`/Dashboard/People/exchange/${data.event}/${data.event}`);
//       }

// }

export async function checkFormCreation(data) {
  console.log(data);

  try {
    // Check if a form exists with both event and uid
    const formExists = await Form.exists({ event: data.event, student: data.uid }).lean().exec();

    if (formExists) {
      revalidatePath("/studentViewForm");
      redirect("/studentViewForm");
    } else {
      redirect(`/Dashboard/People/exchange/${data.event}/${data.event}`);
    }
  } catch (error) {
    console.error('Error checking form creation:', error);
    throw error;
  }
}

