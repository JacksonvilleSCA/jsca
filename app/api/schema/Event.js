import mongoose, { SchemaType } from "mongoose";
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
  active: {
    type: Boolean,
    default: true
  },
  attendees: [
    {
      user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    },
  ],
  waitlist : [
    {
      user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    },
  ],
  items:[{
      type: String
  }],
  itinerary:[{
     title: {type: String},
     days: {type: String},
     time: {type: String},
     activity: {type: String}
  }]
});

const Event = mongoose.models.event || mongoose.model('event', eventSchema)

export default Event;
