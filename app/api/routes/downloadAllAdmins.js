'use server'
import mongoose from "mongoose";
import connect from "../db/dbConnection";
import React from "react";
import Admin from "../schema/Admin";


export async function DownloadAllAdmins(acc) {
  console.log(acc);
  const ID = acc.AdminID;
  
  
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
      city: user.city,
      street: user.street
    }));

    console.log("users are:")
    console.log(formattedUsers);
    
    const headers = 'ID,Admin ID,Email,Username,Password,First Name,Last Name,Phone Number,Country,State,City,Street'
    const csvContent = `${formattedUsers.map(user => `${user._id},${user.adminID},${user.email},${user.username},${user.password},${user.firstname},${user.lastname},${user.phonenumber},${user.country},${user.state},${user.city},${user.street}`).join('\n')}`;

    return {headers,csvContent}


  } catch (error) {
    console.error('Error fetching users:', error);
    return false;
  }
}
