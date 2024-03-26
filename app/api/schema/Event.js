import mongoose, { SchemaType } from "mongoose";
import Create from "./Create";
const { Schema, model, SchemaTypes } = mongoose;

const eventSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  event:{
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
  },
  admin:{
    type: SchemaTypes.ObjectId,
    ref: 'Admin',
  },
  attendees: [{
        type: SchemaTypes.ObjectId,
        ref: 'create',
    },
  ],
  waitlist : [ {
        type: SchemaTypes.ObjectId,
        ref: 'create',
    }
  ]
});

const Event = mongoose.models.event || mongoose.model('event', eventSchema)

export default Event;

