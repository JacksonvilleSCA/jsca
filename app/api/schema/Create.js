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
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        
    },
    lastname: {
        type: String,
        
    },
    phonenumber: {
        type: String,
        
        
    },
    country: {
        type: String,
        
    },
    state: {
        type: String,
    },
    city: {
        type:String,
    }

})


const Create = mongoose.models.create || mongoose.model('create', createSchema)

export default Create;