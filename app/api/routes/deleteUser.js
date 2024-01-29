'use server'
import mongoose from "mongoose";
import Create from "../schema/Create";
import connect from "../db/dbConnection";
import React from "react";


export async function deleteUsers(user) {
    var returnResult;
    console.log("User to delete...")
    console.log(user);
    console.log("USER ID TO DELETE")
    console.log(user._id);
    var ID = user._id;
    try{
        const result = await Create.findByIdAndDelete(ID);
        console.log("Result of deletion:" + result);
        return returnResult = "wilco";

    
    }
    catch (error){
        console.log("ERROR DELETING USER" + error);
        return false;
    }

    
 
}
