'use server'
import mongoose from "mongoose";
import connect from "../db/dbConnection";
import React from "react";
import Create from "../schema/Create";
import Admin from "../schema/Admin";
import Token from "../schema/Token";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const nodemailer = require('nodemailer');


//Note: Rewrite server connection function with host for nodemailer.
//Issue is server timeout on vercel with current code. 

export async function contact(data) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

  const email = data.email
  var ID
  console.log(email)
  const admin = await Admin.findOne({email: email})
  if(admin != null){
    ID = admin._id;
    console.log(admin)
  }


  var member
  if(admin == null){
    member = await Create.findOne({email : email})
    ID = member._id;
    console.log(member)

  }

  
 
  if(admin == null && member == null){
    console.log("Email not found")
    return 0;
  }

  const foundUser = admin || member;
  const USERNAME = foundUser.username;
  


  const min = 100000; 
  const max = 999999; 

  const token = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(token)

  
  console.log(ID)
  console.log(token)
  const tokenNumber = parseInt(token);
  
  try {
    const existingToken = await Token.findOne({ userID: ID });

    if (existingToken) {
      existingToken.token = tokenNumber;
      existingToken.tokenCreatedAt = new Date();
      await existingToken.save();
      console.log("Token updated:", existingToken);
    } else {
      const newToken = await Token.create({
        userID: ID,
        token: tokenNumber,
        tokenCreatedAt: new Date()
      });
      console.log("New token created:", newToken);
    }

    // Check if the index exists before attempting to drop it.
    const indexExists = await Token.collection.indexExists("tokenCreatedAt_1");
    if (indexExists) {
      await Token.collection.dropIndex("tokenCreatedAt_1");
    }

    // Create the new index.
    await Token.collection.createIndex(
      { tokenCreatedAt: 1 },
      { expireAfterSeconds: 3600, name: "tokenCreatedAt_3600" }
    );
  } catch (error) {
    console.log("Error:", error);
  }


//<a href="http://localhost:3000/resetPassword?Token=${tokenNumber}">Reset Password</a>




  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: { 
      user: username,
      pass: password
    }
    
  });


  try {
    const mail = await transporter.sendMail({
      from: username,
      to: email,
      replyTo: username,
      subject: `Password reset from ${email}`,
      html:`
      <h1>Hello JSCA Member!</h1>
      <p>This email is sent because of a password reset request.</p>
      <p>Your username:${USERNAME}</p>
      <p>Your password reset token is: ${tokenNumber}
      <p>If you wish to reset your password click here and enter your token: <a href="https://jsca.vercel.app/tokenCheck">Reset Password</a></p>    
      <p>If you are not a member of JSCA please ignore this email or consider joining today!</p>
      <p><a href="https://www.jsca.org/">www.jsca.org</a></p>
      `
    })
    console.log(mail)
    
    return { status: 200, body: { message: "Success: email was sent" } };

  } catch (error) {
    console.log(error)
    return { status: 500, body: { message: "COULD NOT SEND MESSAGE" } };
  
  
  }
  

 


  
}
