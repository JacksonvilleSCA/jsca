'use server'
import mongoose from "mongoose";
import Create from "../schema/Create";
import Admin from "../schema/Admin";
import connect from "../db/dbConnection";
import React from "react";


export async function accUpdate(ID, formData){

var returnResult;

console.log(ID);
console.log(formData);
const user = await Create.findById(ID);
const userID = user._id;


let emailCheck = formData.email;
let usernameCheck = formData.username;
let passwordCheck = formData.password;


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
    console.log(check4)
    console.log(check5)
    console.log(check6)

    returnResult= false;
}else{
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
    
    if(formData.country == ''){
        console.log("EMPTY FIELD");
        formData.country = user.country;
        console.log("EMPTY UPDATE: " + formData.country);
    }
    if(formData.state == ''){
        console.log("EMPTY FIELD");
        formData.state = user.state;
        console.log("EMPTY UPDATE: " + formData.state);
    }
    if(formData.city == ''){
        console.log("EMPTY FIELD");
        formData.city = user.city;
        console.log("EMPTY UPDATE: " + formData.city);
    }
    
    
    console.log("00000")
    console.log(user);
    var username = formData.username;
    var password = formData.password;
    var email = formData.email;
    var firstname = formData.firstname;
    var lastname = formData.lastname;
    var phonenumber = formData.phone;
    var country = formData.country;
    var state = formData.state;
    var city = formData.city;
    
    
    const filter = {_id: userID};
    const updateInfo = {
        email: email,
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        country: country,
        state: state,
        city: city,
    
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
}



return returnResult;




}
