"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {accInfo} from "../../api/routes/accountInfo"

const Dashboard = () => {
  const router = useRouter();


  useEffect(() => {
    const search = sessionStorage.getItem('ID');
    if (search == null) {
      router.push('/login');
    }
  }, []);




  function manageAccount(){

    router.push('/accountmanage');

    
  }




  function signOut(){
    sessionStorage.removeItem('ID');
    router.push('/login');
    
  }

  
 

    return (
      <div>
      <h1>JSCA Dashboard</h1>
      <h2>Welcome</h2>
      <br></br>
      <br></br>
      <button onClick={manageAccount}>Manage Account</button>
      <br></br>
      <br></br>

      <button onClick={signOut}>Log Out</button>
      </div>

      
    )
  }

export default Dashboard
