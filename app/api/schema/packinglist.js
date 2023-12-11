import mongoose from "mongoose";
import { Schema } from "mongoose";

const packingSchema = new Schema(
    {
        items: [{
            type: String
          }]
    });

const Packlist = mongoose.models.Packlist ||mongoose.model("Packlist", packingSchema);

export default Packlist;