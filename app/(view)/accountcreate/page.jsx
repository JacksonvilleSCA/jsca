"use client";
import React from "react";
//import Button from "../../components/Button/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {POST} from "../../api/routes/createAccount"
import styles from './page.module.css'

const Createaccount = () => {
  const Router = useRouter();
  const [userEmail, setUserEmail] = useState('')
  const [userN, setUserN] = useState('')
  const [userP, setUserP] = useState('')
  const [userFirst, setUserFirst] = useState('')
  const [userLast, setUserLast] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [error, setError] = useState('');





  const handleEmail = (e) =>{
    setUserEmail(e.target.value);
    console.log(userEmail);
    
  }

  const handleUserName = (e) =>{
    setUserN(e.target.value);
    console.log(userN);
  }

  const handleUserPass = (e) =>{
    setUserP(e.target.value);
    console.log(userP);
  }

  const handleFirst = (e) =>{
    setUserFirst(e.target.value);
    console.log(userFirst);
  }

  const handleLast = (e) =>{
    setUserLast(e.target.value);
    console.log(userLast);
  }

  const handlePhone = (e) =>{
    setUserPhone(e.target.value);
    console.log(userPhone);
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();


    var Check = 0;
    if(userEmail == null){
      console.log(userEmail);

      Check = 1;
    }
    if(userFirst == null){
      console.log(userFirst)

      Check = 1;

    }
    if(userLast == null){
      console.log(userLast)

      Check = 1;
    }
    if(userN == null){
      console.log(userN)

      Check = 1;
    }
    if(userP == null){
      console.log(userP)

      Check = 1;
    }
    if(userPhone == '') {
      console.log(userPhone);

      Check = 1;
    }


    const Object = {
      email: userEmail,
      username: userN,
      password: userP,
      firstname: userFirst,
      lastname: userLast,
      phonenumber: userPhone
    }

    console.log(Object);
    var Value;

    if(Check == 0){
      console.log("Create Account Processing.")
      try{
        const data1 = await POST(Object)
        console.log("Response" + data1)
        Value = data1;
      }
      catch(e){
        console.log(e);
      }
    }

    if(Check == 1){
      console.log("ERROR DETECTED");
      setError("-Form must be complete. Check input value.-");
    }

    if(Value != "true"){
      setError("-Form must be complete. Check input value.-");
    }
    else{
      alert("Account Created!");
      Router.push('/login')
    }

    
    
    
  }
 

    return (
      <div>
        <div className={styles.container}>
        <h1 className={styles.title}>Account Creation</h1>

          <br>
          </br>
          <form onSubmit={handleSubmit}>
            <h3 className={styles.textbox2}>Fill in Information Below</h3>
            {error && <p className={styles.textbox2}style={{color: 'red'}}>{error}</p>}




            <div className={styles.textbox2}>
              <label htmlFor="email">Enter Email: </label>
              <input 
              type="email" 
              id="email" 
              name="email"
              onChange={handleEmail}
              placeholder="email"/>
            </div>


            <div className={styles.textbox2}>
              <label htmlFor="username">Enter Username: </label>
              <input 
              type="text" 
              id="username" 
              onChange={handleUserName}
              name="username"
              placeholder="username"/>
            </div>


            <div className={styles.textbox2}>
              <label htmlFor="password">Enter Password: </label>
              <input 
              type="password" 
              id="password" 
              onChange={handleUserPass}
              name="password"

              placeholder="password"/>
            </div>

            <div className={styles.textbox2}>
              <label htmlFor="firstname">Enter First Name: </label>
              <input 
              type="firstname" 
              id="firstname" 
              onChange={handleFirst}
              name="firstname"
              placeholder="first name"/>
            </div>

            <div className={styles.textbox2}>
              <label htmlFor="lastname">Enter Last Name: </label>
              <input 
              type="lastname" 
              id="lastname" 
              onChange={handleLast}
              name="lastname"
              placeholder="last name"/>
            </div>

            <div className={styles.textbox2}>
              <label htmlFor="phonenumber">Enter Phone Number: </label>
              <input 
              type="phonenumber" 
              id="phonenumber" 
              onChange={handlePhone}
              name="phonenumber"
              placeholder="phonenumber"/>
            </div>



            <div className="styles.buttons">
              <button className={styles.rightbutton} type="submit">Create Account</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

              <button className={styles.leftbutton} type="reset">Reset</button>


            
            </div>

          

            


          </form>
        </div>
      </div>

      
    )
  }

export default Createaccount
  