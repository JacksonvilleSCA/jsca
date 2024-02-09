'use server'
import mongoose from "mongoose";
import connect from "../db/dbConnection";
import React from "react";
import Admin from "../schema/Admin";


export async function getAllAdmins(acc) {
  console.log(acc);
  const ID = acc.AdminID;
  console.log("GETTING ALL ADMINS")
  console.log("xxxxx")
  
  try {
    const users = await Admin.find({});
    
    const formattedUsers = users.map(user => ({
      _id: user._id ? user._id.toString() : null,
      adminID: user.adminID,
      email: user.email,
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      phonenumber: user.phonenumber,
      country: user.country,
      state: user.state,
      city: user.city
    }));

    console.log("users are:")
    console.log(formattedUsers);
    return formattedUsers;

  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
