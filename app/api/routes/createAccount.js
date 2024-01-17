'use server'
import mongoose from "mongoose";
import Create from "../schema/Create";
import connect from "../db/dbConnection";
import React from "react";


export async function POST(formData){
//need to add check for email, password, and username. 

const data = (formData);
console.log(data);
var resultReturn; 
const response = await Create.create({
    email: data.email,
    username: data.username,
    password: data.password,
    firstname: data.firstname,
    lastname: data.lastname,
    phonenumber: data.phonenumber,
    country: data.country,
    state: data.state,
    city: data.city,

});

if(response){
    console.log("ok")
    resultReturn = "true";
}

return resultReturn;


}