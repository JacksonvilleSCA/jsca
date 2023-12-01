'use server'
import mongoose from "mongoose";
import Create from "../schema/Create";
import connect from "../db/dbConnection";
import React from "react";


export async function accUpdate(ID, formData){
//replace null value with previous information from account

var returnResult;

console.log(ID);
console.log(formData);
const user = await Create.findById(ID);
const userID = user._id;
if(formData.email == ''){
    console.log("EMPTY FIELD");
    formData.email = user.email;
    console.log("EMPTY UPDATE: " + formData.email);
}

if(formData.username == ''){
    console.log("EMPTY FIELD");
    formData.username = user.username;
    console.log("EMPTY UPDATE: " + formData.username);
}
if(formData.password == ''){
    console.log("EMPTY FIELD");
    formData.password = user.password;
    console.log("EMPTY UPDATE: " + formData.password);
}
if(formData.firstname == ''){
    console.log("EMPTY FIELD");
    formData.firstname = user.firstname;
    console.log("EMPTY UPDATE: " + formData.firstname);
}
if(formData.lastname == ''){
    console.log("EMPTY FIELD");
    formData.lastname = user.lastname;
    console.log("EMPTY UPDATE: " + formData.lastname);
}
if(formData.phone == ''){
    console.log("EMPTY FIELD");
    formData.phone = user.phonenumber;
    console.log("EMPTY UPDATE: " + formData.phone);
}


console.log("00000")
console.log(user);
var username = formData.username;
var password = formData.password;
var email = formData.email;
var firstname = formData.firstname;
var lastname = formData.lastname;
var phonenumber = formData.phone;


const filter = {_id: userID};
const updateInfo = {
    email: email,
    username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
    phonenumber: phonenumber

}
console.log("INFO TO BE UPDATED");
console.log(updateInfo);
const result = await Create.replaceOne(filter,updateInfo);
console.log(`${result.modifiedCount} document replaced`)

const user2 = await Create.findById(ID);
console.log(user2);

if(result){
    returnResult = "wilco";
}

return returnResult;




}
