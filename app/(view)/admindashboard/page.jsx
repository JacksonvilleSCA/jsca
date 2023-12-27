"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {accInfo} from "../../api/routes/accountInfo"

const AdminDash = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  var search = searchParams.get('myID')





    function signOut(){
        search = null;
        if(search == null){
        router.push('/login');
      
        }
    }

  
 

    return (
      <div>
      <h1>JSCA ADMIN</h1>
      <h2>Welcome Admin</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      </div>

      
    )
  }

export default AdminDash