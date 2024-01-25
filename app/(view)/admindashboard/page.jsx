"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {accInfo} from "../../api/routes/accountInfo"
import styles from './page.module.css';


const AdminDash = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  var search = sessionStorage.getItem('AID');


  if(search == null){
    router.push('/adminLogin');
    
  }


  function manageAccount(){

    router.push('/adminManage');

    
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
        <div className={styles.container}>

          <br></br>
          <div>
          <p>Events</p>
          <p>Create Events</p>
             
          </div>
        


          <br>
          </br>

          <div>
          <p>Itenerary</p>
          <p>Packing List</p>

          </div>

          <p>Itenerary</p>
          <p>Create Itenerary</p>
          <p>Packing Lists</p>
          <p>Create Packing Lists</p>

           
          <br>
          </br>
          <p>Student Forms and Essays.</p>


          <br></br>
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