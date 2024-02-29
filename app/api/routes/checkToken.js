"use server";

import React from "react";
import connect from "../db/dbConnection";
import Link from "next/link";
import Token from "../schema/Token";

export async function tokencheck(formData){
    var resultReturn;
    console.log(formData);
    const TOKEN = formData.token;


    const findToken = await Token.findOne({token : TOKEN})
   

    if(findToken == null){
        resultReturn = false
    }
    else{
        resultReturn = {
            token : findToken.token,
            id : findToken.id
        }
    }
    
    return resultReturn;
    
    


}