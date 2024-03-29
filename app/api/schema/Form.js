import mongoose, { SchemaType } from "mongoose";
import Event from "./Event";
import Create from "./Create";
const { Schema, model, SchemaTypes } = mongoose;

const formSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "create", // Refers to the User model
        required: true,
    },
    lastName:{
        type: String, 
        required: true, 
    },
    firstName:{
        type: String, 
        required: true, 
    }, 
    middleName:{ 
        type: String, 
        required: true, 
    }, 
    perferredName:{ 
        type: String, 
        required: true, 
    }, 
    studentPhone: {
        type: Number, 
        required: true, 
    }, 
    sex:{
        type: String, 
        required: true, 
    }, 
    dob:{ 
        type: Date, 
        required: true, 
    }, 
    school:{
        type: String, 
        required: true, 
    }, 
    grade:{
        type: String, 
        required: true, 
    }, 
    proInterest1:{ 
        type: String, 
        required: false, 
    }, 
    proInterest2: {
        type: String, 
        required: false, 
    }, 
    proInterest3: {
        type: String, 
        required: false, 
    },
    passport:{
        type: String, 
        required: true, 
    }, 
    passportCount:{
        type: String, 
        required: true, 
    }, 
    passportexp:{
        type: Date, 
        required: true, 
    },
    allergies:{
        type: String, 
        required: true, 
    }, 
    parentname:{
        type: String, 
        required: true, 
    }, 
    parenttwoname:{
        type:String, 
        required: true, 
    }, 
    street:{
        type: String, 
        required: true, 
    }, 
    city:{
        type:String, 
        required: true, 
    }, 
    state:{
        type: String, 
        required: true, 
    }, 
    zip:{
        type: Number, 
        required: true, 
    }, 
    parentphone:{
        type: Number, 
        required: true, 
    }, 
    parenttwophone:{
        type: Number, 
        required: true, 
    }, 
    parentemail:{
        type: String, 
        required: true, 
    }, 
    signdate:{
        type: Date, 
        required: true, 
    }, 
    signparent:{
        type: String, 
        required: true,
    }, 
    host:{
        type: String, 
        required: true, 

    }, 
    hostfam:{
        type: String, 
        required: true, 
    },
    student:{
        type: SchemaTypes.ObjectId,
        ref: 'create',
    },
    event:{
        type: SchemaTypes.ObjectId,
        ref: 'event',
      },
    essay: {
        type: String, 
        required: true, 
    },
    active: {
        type: Boolean,
        default: null
      },
    //userID:{
       // type: String
    //}

})
const form = mongoose.models.form || mongoose.model('form', formSchema)

export default form;