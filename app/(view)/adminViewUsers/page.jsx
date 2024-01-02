"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {accInfo} from "../../api/routes/accountInfo"

const AdminUV = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  var search = searchParams.get('myID')


  function back(){

    router.back('/adminManage') 

    
  }

  
 

    return (
      <div>
      <h1>ADMIN OVERVIEW</h1>
      <h2>{search}</h2>
      <div>
        <div>
          <p>User list goes here.</p>
       
        </div>
        <div>
        <button onClick={back}>Return</button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      </div>

      
    )
  }

export default AdminUV