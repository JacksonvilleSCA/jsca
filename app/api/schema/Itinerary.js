import mongoose from 'mongoose';
const {Schema} = mongoose;



const ItinerarySchema = new Schema(
    {
        title: {
            type: String
        },
       schedule: [
        {
            day: {type: String},
            time: {type: String},
            activity: {type: String},
        }
       ]
});

const Itinerary =  mongoose.models.Itinerary || mongoose.model('Itinerary', ItinerarySchema) 

export default Itinerary;