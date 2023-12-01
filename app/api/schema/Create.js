import mongoose, {SchemaType} from "mongoose";
const { Schema, model, SchemaTypes} = mongoose;




const createSchema = new Schema({
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