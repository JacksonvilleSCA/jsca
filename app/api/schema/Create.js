import mongoose, {SchemaType} from "mongoose";
const { Schema, model, SchemaTypes} = mongoose;


const ItinerarySchema = new Schema(
    {
       schedule: [
        {
            day: {type: String},
            time: {type: String},
            activity: {type: String},
        }
       ]
});


const createSchema = new Schema({
    itinerary: {
        day: {type: String},
        time: {type: String},
        activity: {type: String},
    },
    email:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
        
    }

})

const Create = mongoose.models.create || mongoose.model('create', createSchema)

export default Create;