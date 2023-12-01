"use server";

import React from "react";
import connect from "../db/dbConnection";
import Create from "../schema/Create";
import RenderResult from "next/dist/server/render-result";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Underdog } from "next/font/google";

export async function POST2(formData){
    var returnValue;
    console.log(formData);
    const username = formData.username;
    const password = formData.password;  
    const user = await Create.findOne({username,password})
    
    if(!user){
        returnValue = null;

    }
    else{
        console.log("USER FOUND");
        console.log(user)
        console.log("USER ID:" + user.id);
        var firstName = user.firstname;
        var id = JSON.stringify(user.id);
        id = id.replace(/['"]+/g, '')
        console.log(id);
        console.log(firstName);

        


        var object ={
            firstname : firstName,
            ID : id

        }
        

        

        
        
        
    }

    return object;
    
    


}