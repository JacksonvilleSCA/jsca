const mongoose = require('mongoose');


const ItinerarySchema = new mongoose.Schema(
    {
        day: string,
        time: string,
        activity: string
    }
)