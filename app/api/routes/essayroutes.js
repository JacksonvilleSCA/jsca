"use server"

import connect from "../db/dbConnection";
import mongoose from "mongoose"; 
import Form from "../schema/Form";

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

export async function getAllForms() {
    try {
        // Connect to the MongoDB database
        await connect;

        // Access the collection using the Form schema
        const formCollection = mongoose.connection.db.collection('forms'); 

        // Fetch all documents from the collection
        const forms = await formCollection.find({}).toArray();

        return forms;
    } catch (error) {
        console.error('Error fetching forms:', error);
        throw error;
    }
}
export async function DELETE(formId) {
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
