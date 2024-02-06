"use client"
import React, { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import Link from "next/link"
import styles from './page.module.css';


const AdminDash = () => {
  const router = useRouter();
  const [search, setSearch] = useState(null);

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
            <p><Link href='/Dashboard/Home'>Create Events</Link></p>


          </div>
          <br></br>
          <div className={styles.square}>
          <p><Link href='/adminViewUsers'>Manage Users</Link></p>

          </div>
          <br></br>
          <div className={styles.square}>
            <p><Link href='/adminForms'>Student Forms and Essays</Link></p>
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