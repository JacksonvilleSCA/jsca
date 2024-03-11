"use client"
import React, { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import Link from "next/link"
import styles from './page.module.css';
import NavThree from "@/app/components/Nav3"


const AdminDash = () => {
  const router = useRouter();
  const [search, setSearch] = useState(null);

  const showCreate = search && !search.includes('j');


  useEffect(() => {
    const searcH = sessionStorage.getItem('AID');
    if (searcH == null) {
      router.push('/login');
    }else{
      setSearch(searcH);
    }
  }, [router]);
  



  function manageAccount(){

    router.push('/adminManage');

    
  }


    function signOut(){
      sessionStorage.removeItem('AID')
      router.push('/login');
      
        
    }

    return (
      <div>
      <NavThree/>
        <div className={styles.container2}>
          <div><h1 className={styles.title}>Dashboard</h1></div>
        </div>
      
      <div>
      <div className={styles.padding}>
      <button className={styles.button2} onClick={manageAccount}>Manage Account</button>
      </div>
        <br></br>
        <div className={styles.container}>
          <div className={styles.square}>
            <p><Link className={styles.colorP} href='Dashboard/EventHistory'>Event History</Link></p>
            <p><Link className={styles.colorP} href='/Dashboard/Home'>Create Events</Link></p>


          </div>
          <br></br>
          <div className={styles.square}>
          <p><Link className={styles.colorP} href='/adminViewUsers'>Manage Members/Students</Link></p>
          {showCreate && (
            <p><Link className={styles.colorP} href='/adminViewAdmins'>Manage Admins</Link></p>

          )
        }


          </div>
          <br></br>
          <div className={styles.square}>
            <p><Link className={styles.colorP} href='/adminForms'>Student Forms and Essays</Link></p>
          </div>



          <br></br>
        </div>
        <br></br>
        <div className={styles.padding}>
        <button className={styles.button} onClick={signOut}>Log Out</button>
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