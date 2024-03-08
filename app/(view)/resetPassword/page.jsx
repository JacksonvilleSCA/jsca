"use client";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { resetPassword } from '@/app/api/routes/resetPassword';
import styles from './page.module.css'
 
//make secondary window that requires the user to enter their token.
//after they enter their token they are taken to the password reset
const ResetPass = () => {
  const router = useRouter();

  const [userValue, setUserValue] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  
  useEffect(() => {
    //const searchParams = new URLSearchParams(window.location.search);
    //const tokenFromURL = searchParams.get('Token');
    //if(tokenFromURL == "" || tokenFromURL == null || isNaN(tokenFromURL)){
      //router.push('/login')
    //}
    const Tok = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    if(Tok == null || id == null){
      router.push('/login')
    }
    else{
      setToken(Tok)
    }
    //setToken(tokenFromURL);
  }, []);
  
  
  

  const handlePassword = (e) =>{
    setPassword(e.target.value);
  }

  const handlePassword2 = (e) =>{
    setPassword2(e.target.value);
  }

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("")
    var finalPassword
    if(password != password2){
      setError("Passwords don't match.")
      return
      
    }
    else if(password == "" && password2 == ""){
      setError("Passwords can not be empty.")
    }
    else{
      finalPassword = password
    }

    const formData={
      password: finalPassword
    }

    const result = await resetPassword(formData, token)
    if(result == "wilco"){
      alert("Update successful!")
      router.push('/login')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('id')
    }
    else{
      setError("Error with password.")
    }

    
     

  }

  



  
  return (
    
    <div> 
  
    <br></br>

    <h3 className={styles.container}>Reset Password</h3>

    <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.inputgroup}>
        <label htmlFor="password">New Password:</label>
        <input
            type="text"
            placeholder="---"
            name="password"
            onChange={handlePassword}
            id="password"
        />

        </div>
        <br>
        </br>
       

        <div className={styles.inputgroup}>
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
            type="password"
            placeholder="---"
            name="password"
            onChange={handlePassword2}
            id="password"
        />
        </div>
        
      

        <button type="submit">Submit</button>
        <br></br>

        {error && <p style={{color: 'red'}}>{error}</p>}



      

    </form>
    <br></br>


    </div>
  )
}

export default ResetPass
