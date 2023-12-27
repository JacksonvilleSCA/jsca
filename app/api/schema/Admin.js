import mongoose, {SchemaType} from "mongoose";
const { Schema, model, SchemaTypes} = mongoose;




const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

   

})

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

export default Admin;