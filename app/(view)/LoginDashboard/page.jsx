"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {accInfo} from "../../api/routes/accountInfo"
import styles from "./page.module.css"

const Dashboard = () => {
  const router = useRouter();


  useEffect(() => {
    const search = sessionStorage.getItem('uid');
    if (search == null) {
      router.push('/login');
    }
  }, []);




  function manageAccount(){

    router.push('/accountmanage');

    
  }




  function signOut(){
    sessionStorage.removeItem('uid');
  
    router.push('/login');
    
  }

  
 

    return (
      
      <div>
        
        <div className={styles.container2}>
          <div><h1 className={styles.title}>Dashboard</h1></div>
        </div>
      <br></br>
      <br></br>
      <div className={styles.padding}>
      <button className={styles.button2} onClick={manageAccount}>Manage Account</button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className={styles.container}>
          <div className={styles.square}>
            <p className={styles.colorP}><Link className={styles.colorP} href='Dashboard/People'>Events</Link></p>
          </div>
         
          <div className={styles.square}>
            <p className={styles.colorP}><Link className={styles.colorP} href='/studentform'>Student Forms and Essays</Link></p>
          </div>

        </div>
        <br></br>

        <br>
        </br>
        <br></br>
        <div className={styles.padding}>
        <button className={styles.button} onClick={signOut}>Log Out</button>
        </div>
        </div>

      
    )
  }

export default Dashboard
