import mongoose from 'mongoose';
const {Schema} = mongoose;



const ItinerarySchema = new Schema(
    {
        title: {
            type: String
        },
        duration: {
            startDate: String,
            endDate: String,
        },
       schedule: [
        {
            day: {type: Number},
            time: {type: String},
            activity: {type: String},
        }
       ]
});

const Itinerary =  mongoose.models.Itinerary || mongoose.model('Itinerary', ItinerarySchema) 

export default Itinerary;