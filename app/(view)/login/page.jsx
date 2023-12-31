"use client";
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import {POST2} from '../../api/routes/logIn'




const Login = () => {
  const router = useRouter();

  const [userValue, setUserValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');

  var Value1 = null;




  const handleUsername = (e) =>{
    setUserValue(e.target.value);
  }


  const handlePassword = (e) =>{
    setPasswordValue(e.target.value);
  }



  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = {
      username: userValue,
      password: passwordValue,
    }
    
    try{
      const data1 = await POST2(formData);
      console.log("Response" + data1);
      Value1 = data1;
    }
    catch (e) {
      console.log(e);

    }

    if(Value1 == null){
      setError("User does not exist. Check input values.");

    }
    else{
      const myID = Value1.ID;
      const Name= Value1.firstname
      console.log(Name);
      console.log(myID);
      router.push(`/LoginDashboard?myID=${myID}`)
    }


  }

  
  return (
    
    <div> 
  
    <br></br>
    <h3 className={styles.container}>Login</h3>



    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={userValue}
        onChange={handleUsername}
        id="username"
      />

      <br></br>

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={passwordValue}
        onChange={handlePassword}
        id="password"
      />
      <br></br>

      <button type="submit">Login</button>

      <br>
      </br>
      {error && <p style={{color: 'red'}}>{error}</p>}
      

    </form>
    <br></br>


    </div>
  )
}

export default Login
