'use server'
import mongoose from "mongoose";
import Admin from "../schema/Admin";
import connect from "../db/dbConnection";
import React from "react";


export async function POST(formData){


const data = (formData);
console.log(data);
var resultReturn; 
const response = await Admin.create({
    username: data.username,
    password: data.password,

});

if(response){
    console.log("ok")
    resultReturn = "true";

    

}

return resultReturn;


}