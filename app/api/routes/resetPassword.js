'use server'
import mongoose from "mongoose";
import connect from "../db/dbConnection";
import React from "react";
import Admin from "../schema/Admin";
import Create from "../schema/Create";
import Token from "../schema/Token";


export async function resetPassword(formData, token) {
  var resultReturn
  console.log(formData)
  console.log(Token)
  const userCheck = await Token.findOne({token: token})
  console.log(userCheck)
  if(userCheck == null){
    return 0
  }
  const id = userCheck.userID;
  var userCheck3
  var passCheck
  //admin id 
  const userCheck2 = await Admin.findOne({_id: id})
  try{
    if (userCheck2 == null){
      //member id
      userCheck3 = await Create.findOne({_id: id})
      console.log("Member/Student detected")
      console.log(userCheck3)
      //reset member password
      passCheck = 0
    }
    else{
      console.log("Admin detected")
      console.log(userCheck2)
      //reset admin password
      passCheck = 1
    }
  }
  catch(error){
    console.log("error has occurred")
    resultReturn = ""
  }
  //update check below for BOTH admins and users. 

  if(passCheck == 0){
    let passwordCheck = formData.password;
    const memberCheck3 = await Create.findOne({password: passwordCheck})
    const memberCheck4 = await Admin.findOne({password: passwordCheck})

    if(memberCheck3 != null || memberCheck4 != null){
      resultReturn = false
    }
    else{
      console.log("xxxx")
      const USERID = userCheck3._id
      const UPDATE = await Create.findOneAndUpdate(
        {_id: USERID},
        {password: formData.password},
        {new: true}
      )
      console.log(UPDATE)
      resultReturn = "wilco"
    }
    
  }

  if(passCheck == 1){
    let passwordCheck = formData.password;
    const memberCheck3 = await Create.findOne({password: passwordCheck})
    const memberCheck4 = await Admin.findOne({password: passwordCheck})

    if(memberCheck3 != null || memberCheck4 != null){
      resultReturn = false
    }else{
      console.log("xxxx")
      const USERID = userCheck2._id
      const UPDATE = await Admin.findOneAndUpdate(
        {_id: USERID},
        {password: formData.password},
        {new: true}
      )
      console.log(UPDATE)
      resultReturn = "wilco"
    }
    

  }


  if(resultReturn == "wilco"){
    const removeToken = await Token.findOneAndDelete({token : token})
    console.log(removeToken)
    

  }

 
    

  return(resultReturn)


}
