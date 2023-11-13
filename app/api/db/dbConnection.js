import mongoose from "mongoose";

let client;

try{
    client = await  mongoose.connect(MONGO_DB_URI);
    console.log('DB connected');
}catch(error){
    console.log('Error connecting to the database', error)
}
