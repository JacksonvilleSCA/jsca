'use server'
import mongoose from "mongoose";
import Admin from "../schema/Admin";
import connect from "../db/dbConnection";
import React from "react";


export async function deleteAdmins(user) {
    var returnResult;
    console.log("User to delete...")
    console.log(user);
    console.log("USER ID TO DELETE")
    console.log(user._id);
    var ID = user._id;
    try{
        const result = await Admin.findByIdAndDelete(ID);
        console.log("Result of deletion:" + result);
        return returnResult = "wilco";

    
    }
    catch (error){
        console.log("ERROR DELETING ADMIN" + error);
        return false;
    }

    
 
}
