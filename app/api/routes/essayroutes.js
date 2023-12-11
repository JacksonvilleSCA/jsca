"use server"

import connect from "../db/dbConnection";
import mongoose from "mongoose"; 
import Form from "../schema/Form";

export async function POST(formData){

//const data = Object.fromEntries(formData);
// console.log(data)

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

    // Insert the new document into the collection
    const result = await formCollection.insertOne(newForm);

    console.log('Document inserted:', result.insertedId);

  } catch (error) {
    console.error('Error handling POST request:', error);
    return { success: false, error: error.message };
  }
}
