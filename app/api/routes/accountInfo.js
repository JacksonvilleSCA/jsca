"use server";

import React from "react";
import connect from "../db/dbConnection";
import Create from "../schema/Create";
import RenderResult from "next/dist/server/render-result";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export async function accInfo(ID){
    console.log(ID);
    const user = await Create.findById(ID);
    
    const object = {
        email: user.email,
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber

    }

    return object;

    
  
    
    


}