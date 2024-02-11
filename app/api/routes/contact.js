'use server'
import mongoose from "mongoose";
import connect from "../db/dbConnection";
import React from "react";
import Create from "../schema/Create";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const nodemailer = require('nodemailer');


//set up encryption and decryption for the page.
//We will encryp the user's id then decrypt it on the recieving page.
//This will then allow the system to know which user this is. 
//Must find a way to set up a check if it is a member or admin.

export async function contact(data) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

  const email = data.email


  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
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
      <p>If you wish to reset your password click here:<a href="http://localhost:3000/login">Reset Password</a>
      <p>If you are not a member of JSCA please ignore this email or consider joining today!</p>
      <p><a href="https://www.jsca.org/">www.jsca.org</a></p>
      `
    })
    
    return { status: 200, body: { message: "Success: email was sent" } };

  } catch (error) {
    console.log(error)
    return { status: 500, body: { message: "COULD NOT SEND MESSAGE" } };
  
  
  }
  

 


  
}
