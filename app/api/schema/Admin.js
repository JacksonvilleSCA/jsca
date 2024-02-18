import mongoose, {SchemaType} from "mongoose";
const { Schema, model, SchemaTypes} = mongoose;




const AdminSchema = new Schema({
    adminID: {
        type: String,
    },
    email: {
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
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    city: {
        type:String,
    },
    street:{
        type:String,

    }



})

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

export default Admin;