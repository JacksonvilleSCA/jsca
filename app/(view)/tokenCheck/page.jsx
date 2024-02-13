"use client";
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { tokencheck } from '@/app/api/routes/checkToken';
 

const forgotPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');



  const handleToken = (e) =>{
    setToken(e.target.value);
  }


  


  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("")
    const formData = {
      token : token
    }

    const result = await tokencheck(formData)

    if(result == false){
      setError("Error with token.")
      

    }
    else{
      const value1 = result.token
      const value2 = result.userID
      sessionStorage.setItem('token', value1)
      sessionStorage.setItem('id', value2)
      router.push('/resetPassword')
    }

  }

  




  
  return (
    
    <div> 
  
    <br></br>
    <h3 className={styles.container}>Token Check</h3>



    <form className={styles.form} onSubmit={handleSubmit}>
        
      <input
        type="text"
        placeholder="Insert Token"
        name="token"
        onChange={handleToken}
        id="token"
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

export default forgotPassword
