'use server'
import connect from "../db/dbConnection";
import Packlist from "../schema/packinglist";
// import { NextResponse } from "next/server";


export const AddItem = async (formData)=> {
    "use server"
    const data = (formData)
    console.log(data)
    try {
        // connect();
        const newList = await Packlist.create({
            items: formData.items
        });

        await newList.save();

        if(newList){
            console.log('ok');
            console.log(newList);
            newList.save()
        }
   
    } catch (error) {
        console.log(error)
         throw new Error('failed to create the list')
        
    }

}
  
export async function GET(_id){
    const data = await Packlist.findById()
}
// export async function AddItem(formData){
//     const  packinglist = formData.get('item');


//   }



// export async function POST(formData) {
//     const {description} = await req.json();
//     await connect();
//     await Packlist.create({description});
//     return NextResponse.json({message: "topic created"}, {status: 201});

// }

// //get method
// export async function GET(){
//     await connect();
//     const packlist = await Packlist.find();
//     return NextResponse.json({ packlist})
// } 

// export async function DELETE(req){
//     const id = request.nextUrl.searchParams.get("id");
//     await connect();
//     await Packlist.findByIdAndDelete(id);
//     return NextResponse.json({ message: "Topic deleted"}, {status: 200})
// }