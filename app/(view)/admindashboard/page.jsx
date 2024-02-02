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

  useEffect(() => {
    var search = sessionStorage.getItem('AID');
    if(search == null){
    router.push('/login');
    }
  }, []);
  


  if(search == null){
    router.push('/adminLogin');
    
  }


  function manageAccount(){

    router.push('/adminManage');

    
  }


    function signOut(){
      sessionStorage.removeItem('AID')
      sessionStorage.removeItem('gid')
      router.push('/adminLogin');
      
        
    }

  
 

    return (
      <div>
      <h1>JSCA ADMIN</h1>
      <h2>Welcome {search}</h2>
      <div>
        <div>
        <button onClick={manageAccount}>Manage Account</button>
        </div>
        <br></br>
        <div className={styles.container}>
          <div className={styles.square}>
            <p><Link href='Dashboard/EventHistory'>Event History</Link></p>
            <p>Create Events</p>


          </div>
          <br></br>
          <div className={styles.square}>
            <p>Itinerary</p>
            <p>Create Itinerary</p>
            <p>Packing Lists</p>
            <p>Create Packing Lists</p>
          </div>
          <br></br>
          <div className={styles.square}>
            <p>Student Forms and Essays</p>
          </div>



          <br></br>
        </div>
        <br></br>
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