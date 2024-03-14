import mongoose from "mongoose";

const connect = mongoose.connect("mongodb+srv://vercel-admin-user:A7aWHvEWX6maVLbh@cluster0.fgw4fx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


export default connect;


//  async function connect(){
//     try{
//         await mongoose.connect(process.env.MONGO_DB_URI);
//     }
//     catch(error){
//         console.log("Failed to connect to DB", error)

//     }
// }

// export default connect;
