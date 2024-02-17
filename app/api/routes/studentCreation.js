'use server'
import mongoose from "mongoose";
import Create from "../schema/Create";
import connect from "../db/dbConnection";
import React from "react";
import Admin from "../schema/Admin";


export async function STUDP(formData){

const data = (formData);
console.log(data);
var resultReturn; 


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

}

return resultReturn;


}