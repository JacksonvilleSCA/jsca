"use client";
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import { AdminInfo } from '@/app/api/routes/adminInfo';
//Must create Account Update.

export default function AdminAccountManage() {
  const router = useRouter();
  const [accData, setAccData] = useState('');
  var userN;
  var passW;

  


  const searchParams = useSearchParams();
  var search = searchParams.get('myID')

  
  useEffect(() => {
    loadPage();
  }, []);


  const loadPage = async () =>{

    try{
      const acc = await AdminInfo(search);
      setAccData(acc);


   } catch (error){
   console.log(error);
   }  


  
  } 

  function manageUsers(){

    router.push(`/adminViewUsers?myID=${search}`)
 
  }

  function dashB(){

    router.back('/admindashboard') 
  }


  const handleSubmit = async (e) => {
    
    

    e.preventDefault();



  }


  console.log("Rofl copter");
  console.log(accData);

  userN = accData.username;
  passW = accData.password;






  

    return(
      
      <div>

      <h1>Manage Admin Account</h1>
      <button onClick={dashB}> Return </button>


      <br></br>

      <div className={styles.container}>
        <div className={styles.textbox}>
          <form onSubmit={handleSubmit}>
            <h2>(WIP) Admin ID: {search}</h2>

            <p>UserName:</p>
            <p></p>
            <input className={styles.textbox} type="text" id="firstName" placeholder={userN}
            />
            <p>PassWord: </p>
            <input className={styles.textbox} type="text" id="lastName" placeholder={passW}
             />
      
            
            

             
         
          <br></br>
          <br></br>
          <br></br>

            <button type="submit" className={styles.textbox3}>Update</button>

            </form>

        </div>
        <div>
        <button onClick={manageUsers}>ManageUsers</button>

          <Link href='/adminCreate'>Admin Creation</Link>
          <br></br>
          <br></br>
        </div>


      </div>
      

      


  
      </div>
    )
  }
  
