'use server'
import mongoose from "mongoose";
import Create from "../schema/Create";
import connect from "../db/dbConnection";
import React from "react";


export async function getAllUsers() {
  try {
      const users = await Create.find({}); 
      
      const formattedUsers = users.map(user => ({
          email: user.email,
          username: user.username,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
          phonenumber: user.phonenumber
      }));
      console.log("users are:")
      console.log(formattedUsers);
      return formattedUsers;
  } catch (error) {
      console.error('Error fetching users:', error);
      return [];
  }
}
