import mongoose, {SchemaType} from "mongoose";
const { Schema, model, SchemaTypes} = mongoose;



const TokenSchema = new Schema({

    userID:{
        type: String,
        unique: true
    },
    token:{
        type:Number,
    },
    tokenCreatedAt:{
        type: Date
    }

})


const Token = mongoose.models.Token || mongoose.model('Token', TokenSchema)

export default Token;