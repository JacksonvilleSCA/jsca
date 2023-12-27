"use client";
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { accUpdate} from "../../api/routes/accountUpdate"



export default function AdminAccountManage() {
  const router = useRouter();

  


  const searchParams = useSearchParams();
  var search = searchParams.get('myID')

  
  //useEffect(() => {
  //  loadPage();
 // }, []);


  //const loadPage = async () =>{

    //try{
     // const acc = await accInfo(search);
      //setAccData(acc);


   // } catch (error){
   // console.log(error);
   // }  


  
 // } 


  


  const handleSubmit = async (e) => {
    
    

    e.preventDefault();



  }



  

    return(
      
      <div>

      <h1>Manage Admin Account</h1>

      <br></br>

      <div className={styles.container}>
        <div className={styles.textbox}>
          <form onSubmit={handleSubmit}>
            <h2>Admin ID: {search}</h2>
            <p>UserName:</p>
            <p></p>
            <input className={styles.textbox} type="text" id="firstName" placeholder="Username"
            />
            <p>PassWord: </p>
            <input className={styles.textbox} type="text" id="lastName" placeholder="Password"
             />
         
            <br></br>
            <br></br>
            <br></br>

            <button type="submit" className={styles.textbox3}>Update</button>

            </form>

        </div>
        <div>
          <p>Manage Users</p>
          <p>Create Admin</p>
          <br></br>
          <br></br>
        </div>


      </div>
      

      


  
      </div>
    )
  }
  
