import mongoose from "mongoose";

const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    }catch(error){
        console.log('Error connecting to the database', error)
    }
}

export default connect;