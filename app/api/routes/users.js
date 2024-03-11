'use server'
import mongoose from "mongoose";
import Create from "../schema/Create";
import connect from "../db/dbConnection";
import React from "react";


export async function getAllUsers(acc) {
  console.log(acc);
  console.log("TESTING FOR JUNIOR")
  const ID = acc.AdminID;
  const Con = acc.city;
  var check = false
  if(ID.includes('j')){
    console.log("JUNIOR ADMIN DETECTED");
    check = true;
  }
  else{
    console.log("SUPER ADMIN IN USE");
  }
  try {
    const users = await Create.find({}); 
    
    const formattedUsers = users
    .filter(user => !check || user.city == Con)
    .map(user => ({
      _id: user._id ? user._id.toString() : null,
      email: user.email,
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      phonenumber: user.phonenumber,
      country: user.country,
      state: user.state,
      city: user.city,
      street: user.street
    }));

    console.log("users are:")
    console.log(formattedUsers);
    return formattedUsers;

  } catch (error) {

    console.error('Error fetching users:', error);
    return [];


  }


}
