'use server'
import mongoose from "mongoose";
import Admin from "../schema/Admin";
import Create from "../schema/Create";
import connect from "../db/dbConnection";
import React from "react";


export async function POST(formData){
//For admin, if a user does not have an ADMIN ID during log in, kick user. 
//For junior admins, add a single letter tag to the front of their code. This signifies a junior admin. 

const min = 1000000000; 
const max = 9999999999; 
var AdminID = Math.floor(Math.random() * (max - min + 1)) + min;
AdminID.toString();

const data = (formData);
console.log(data);
console.log(AdminID)
var resultReturn;
var check = data.checkbox;
console.log("ROFL COPTER");
console.log(check);


let emailCheck = data.email;
let usernameCheck = data.username;
let passwordCheck = data.password;


const check1 = await Create.findOne({email : emailCheck})
const check2 = await Create.findOne({username: usernameCheck})
const check3 = await Create.findOne({password: passwordCheck})
const check4 = await Admin.findOne({email: emailCheck})
const check5 = await Admin.findOne({username: usernameCheck})
const check6 = await Admin.findOne({password: passwordCheck})



if(check1 != null || check2 != null || check3 != null || check4 != null || check5 != null ||check6 != null){
    console.log(check1)
    console.log(check2)
    console.log(check3)

    resultReturn = false;
}
else{

    var j = "j"
    if(check != false){
        AdminID = j + AdminID;
    }


    const response = await Admin.create({
        adminID: AdminID,
        email: data.email,
        username: data.username,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname, 
        phonenumber: data.phonenumber,
        country: data.country,
        state: data.state,
        city: data.city,
        street: data.street
    
    
    })
    if(response){
        console.log("Admin created.");
        resultReturn = "true"
    }
}


return resultReturn;




}