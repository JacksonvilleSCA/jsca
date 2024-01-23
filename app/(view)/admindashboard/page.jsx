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


  function manageAccount(){

    router.push(`/adminManage?myID=${search}`);

    
  }


    function signOut(){
        search = null;
        if(search == null){
        router.push('/adminLogin');
      
        }
    }

  
 

    return (
      <div>
      <h1>JSCA ADMIN</h1>
      <h2>Welcome {search}</h2>
      <div>
        <div>
        <button onClick={manageAccount}>Manage Account</button>
        </div>
        <div>
        <button onClick={signOut}>Log Out</button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      </div>

      
    )
  }

export default AdminDash