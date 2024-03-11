'use server'
import connect from "../db/dbConnection";
import Packlist from "../schema/packinglist";
// import { NextResponse } from "next/server";


export async function AddItem (formData){
    "use server"
    const data = (formData)
    try {
        const newList = new Packlist({
            eventId: formData.eventId,
            items: formData.items
        });

        await newList.save();

        if(newList){
            console.log(newList);
        }
   
    } catch (error) {
        
         throw new Error('failed to create the list')
        
    }

}
  
export async function GET(){
    try{
        const data = await Packlist.find()
        const packlists = data.map((doc) =>{
            const plist = doc.toObject();
            plist._id = plist._id.toString()
            return plist;
        })
    
        return {props: {packlists: JSON.parse(JSON.stringify(packlists))}}

    }catch(error){
        throw new Error('failed to fetch the list')

    }
  
}


  
export async function GETROUTE(eventId){
    try{
        const data = await Packlist.findOne( {eventId: eventId.id } ).populate('eventId').lean().exec();

        if(!data){
            return {props: {packingList: [] }};
        }

        const packlist = JSON.parse(JSON.stringify(data));
        packlist._id = packlist._id.toString();

        if(packlist.eventId && packlist.eventId._id){
            packlist.eventId._id = packlist.eventId._id.toString();
        }

        return {props: {packlist: JSON.parse(JSON.stringify(packlist))}};

    }catch(error){
        throw new Error('failed to fetch the list')

    }
}
