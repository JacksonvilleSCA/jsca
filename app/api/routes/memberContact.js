'use server'
import mongoose from "mongoose";
import connect from "../db/dbConnection";
import React from "react";
import Create from "../schema/Create";
import Admin from "../schema/Admin";



const nodemailer = require('nodemailer');

//Note: Rewrite server connection function with host for nodemailer.
//Issue is server timeout on vercel with current code. 

export async function contactMember(data) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

  const email = data

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: { 
      user: username,
      pass: password
    },
    connectionTimeout: 20000, 
    greetingTimeout: 20000,   
    socketTimeout: 20000  
    
  });

  let info = ``;


  try {

      if(data.checkStatus === "join"){
        info = `
        <h1>Hello JSCA Member!</h1>
        <p>This email is sent because of a password reset request.</p>
        <p>If you wish to reset your password click here and enter your token: <a href="https://jsca.vercel.app/tokenCheck">Reset Password</a></p>    
        <p>If you are not a member of JSCA please ignore this email or consider joining today!</p>
        <p><a href="https://www.jsca.org/">www.jsca.org</a></p>
        `

      }if(data.checkStatus === "removeW"){

        info = `
        <h1>Hello JSCA Member!</h1>
        <p>This email is sent because of a password reset request.</p>
        <p>If you wish to reset your password click here and enter your token: <a href="https://jsca.vercel.app/tokenCheck">Reset Password</a></p>    
        <p>If you are not a member of JSCA please ignore this email or consider joining today!</p>
        <p><a href="https://www.jsca.org/">www.jsca.org</a></p>
        `


      }if(data.checkStatus === "removeA"){

        info = `
        <h1>Hello JSCA Member!</h1>
        <p>This email is sent because of a password reset request.</p>
        <p>If you wish to reset your password click here and enter your token: <a href="https://jsca.vercel.app/tokenCheck">Reset Password</a></p>    
        <p>If you are not a member of JSCA please ignore this email or consider joining today!</p>
        <p><a href="https://www.jsca.org/">www.jsca.org</a></p>
        `

      }

    const mail = await transporter.sendMail({
      from: username,
      to: email,
      replyTo: username,
      subject: `Password reset from ${email}`,
      html:info
    });


    console.log(mail)
    
    return { status: 200, body: { message: "Success: email was sent" } };

  } catch (error) {
    console.log(error)
    return { status: 500, body: { message: "COULD NOT SEND MESSAGE" } };
  
  
  }
  
  
}