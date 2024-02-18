"use server";

import React from "react";
import connect from "../db/dbConnection";
import Admin from "../schema/Admin";
import Create from "../schema/Create";


export async function AdminUpdate(adminID,formData){

    console.log(adminID);
    const admin = await Admin.findOne({adminID : adminID})
    const userID = admin._id;
    var returnResult;



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

        returnResult= false;
    
    }else{
        console.log("View admin");
    console.log(admin);
    console.log(formData);

    if(formData.email == ''){
        console.log("EMPTY FIELD");
        formData.email = admin.email;
        console.log("EMPTY UPDATE: " + formData.email);
    }
    if(formData.username == ''){
        console.log("EMPTY FIELD");
        formData.username = admin.username;
        console.log("EMPTY UPDATE: " + formData.username);
    }
    
    if(formData.adminname == ''){
        console.log("EMPTY FIELD");
        formData.adminname = admin.adminname;
        console.log("EMPTY UPDATE: " + formData.adminname);
    }
    if(formData.password == ''){
        console.log("EMPTY FIELD");
        formData.password = admin.password;
        console.log("EMPTY UPDATE: " + formData.password);
    }
    if(formData.firstname == ''){
        console.log("EMPTY FIELD");
        formData.firstname = admin.firstname;
        console.log("EMPTY UPDATE: " + formData.firstname);
    }
    if(formData.lastname == ''){
        console.log("EMPTY FIELD");
        formData.lastname = admin.lastname;
        console.log("EMPTY UPDATE: " + formData.lastname);
    }
    if(formData.phone == ''){
        console.log("EMPTY FIELD");
        formData.phone = admin.phonenumber;
        console.log("EMPTY UPDATE: " + formData.phone);
    }
    
    if(formData.country == ''){
        console.log("EMPTY FIELD");
        formData.country = admin.country;
        console.log("EMPTY UPDATE: " + formData.country);
    }
    if(formData.state == ''){
        console.log("EMPTY FIELD");
        formData.state = admin.state;
        console.log("EMPTY UPDATE: " + formData.state);
    }
    if(formData.city == ''){
        console.log("EMPTY FIELD");
        formData.city = admin.city;
        console.log("EMPTY UPDATE: " + formData.city);
    }

    if(formData.street == ''){
        console.log("EMPTY FIELD");
        formData.street = admin.street;
        console.log("EMPTY UPDATE: " + formData.street);
    }

    console.log(formData);
    console.log("Checking for user ID")
    console.log(userID);


    var username = formData.username;
    var password = formData.password;
    var email = formData.email;
    var firstname = formData.firstname;
    var lastname = formData.lastname;
    var phonenumber = formData.phone;
    var country = formData.country;
    var state = formData.state;
    var city = formData.city;
    var street = formData.street;


    const filter = { _id: userID };
    const updateInfo = {
        $set: {
            email: email,
            AdminID: admin.adminID,
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            country: country,
            state: state,
            city: city,
            street: street
        }
    };

    console.log("INFO TO BE UPDATED");
    console.log(updateInfo);
    const result = await Admin.updateOne(filter, updateInfo);  
    console.log(`${result.modifiedCount} document updated`);

    if(result){
        returnResult = "wilco";
    }

    }
    

    

    return returnResult;




}