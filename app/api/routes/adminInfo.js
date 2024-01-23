"use server";

import React from "react";
import connect from "../db/dbConnection";
import Admin from "../schema/Admin";


export async function AdminInfo(adminID){
    console.log(adminID);
    const admin = await Admin.findOne({adminID : adminID})
    console.log("View admin");
    const object = {
        AdminID: admin.adminID,
        email: admin.email,
        username: admin.username,
        password: admin.password,
        firstname: admin.firstname,
        lastname: admin.lastname,
        phonenumber: admin.phonenumber,
        country: admin.country,
        state: admin.state,
        city: admin.city

    }
    console.log(object);

    return object;

    
  
    
    


}