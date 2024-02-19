"use server";

import React from "react";
import connect from "../db/dbConnection";
import Create from "../schema/Create";
import Admin from "../schema/Admin";
import Link from "next/link";

export async function POST2(formData){
    var returnValue;
    console.log(formData);
    const username = formData.username;
    const password = formData.password;  
    const admin = await Admin.findOne({username,password})
    var user

    if(!admin){
        console.log("no admin")
        user = await Create.findOne({username,password})
        var id
        if(user != null){
            id = JSON.stringify(user.id);
            id = id.replace(/['"]+/g, '')
        }

        returnValue = {
            ID: id,
            value: "user"
        }
    }
    else{
        console.log("no member")
        var id = JSON.stringify(admin.adminID);
        id = id.replace(/['"]+/g, '')

        returnValue = {
            ID: id,
            value: "admin"
        }

    }

    if(admin == null && user == null){
        returnValue = null
    }    
  

    return returnValue;
    
    


}