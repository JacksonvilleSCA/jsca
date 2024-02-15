"use client";
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import { contact } from '@/app/api/routes/contact';
 

const ForgotPassword = () => {
  const router = useRouter();

  const [userValue, setUserValue] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  var Value1 = null;


  const handleEmail = (e) =>{
    setEmail(e.target.value);
  }


  


  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("")
    const formData = {
      email: email
    }
    
    const response = await contact(formData)
    if(response){
      alert("Email was sent! Check spam incase email does not show up in a few minutes.")
      router.push('/login')
    }
    else if(response == 0){
      setError("Error with email, check input.");

    }
     

  }

  


  function dashB(){

    router.back() 
  }


  
  return (
    
    <div> 
    <button onClick={dashB}> Return </button>
  
    <br></br>
    <h3 className={styles.container}>Forgot Password?</h3>



    <form className={styles.form} onSubmit={handleSubmit}>
        
      <input
        type="text"
        placeholder="email"
        name="email"
        onChange={handleEmail}
        id="email"
      />

      <br></br>

      

      <button type="submit">Submit</button>

      {error && <p style={{color: 'red'}}>{error}</p>}


      <br>
      </br>
      <br></br>
     

     

      

    </form>
    <br></br>


    </div>
  )
}

export default ForgotPassword
