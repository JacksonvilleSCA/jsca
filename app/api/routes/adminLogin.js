"use server";

import React from "react";
import connect from "../db/dbConnection";
import Admin from "../schema/Admin";


export async function POSTA(formData){
    var returnValue;
    console.log(formData);
    let userNAME = formData.username;
    let passWORD = formData.password;
    const username = userNAME.replace(/\s/g, "");
    const password = passWORD.replace(/\s/g, "");
  

    const admin = await Admin.findOne({username,password})
    
    if(!admin){
        returnValue = null;

    }
    else{
        console.log("USER FOUND");
        console.log(admin)
        console.log("USER ID:" + admin.id);
        var firstName = admin.firstname;
        var id = JSON.stringify(admin.id);
        id = id.replace(/['"]+/g, '')
      
        var object ={
            firstname : firstName,
            ID : id,
            AdminID : admin.adminID

        }
        console.log("---")
        console.log(object)

        if(object.AdminID){
            returnValue = object;
        }
        else if(!object.AdminID){
            console.log("NOT ADMIN!")
            returnValue = "null1"
        }
    
        
    }


    return returnValue;

   
    
    


}