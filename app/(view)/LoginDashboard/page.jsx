"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {accInfo} from "../../api/routes/accountInfo"

const Dashboard = () => {


  const [name, setName] = useState('');

  const router = useRouter();


  const searchParams = useSearchParams();
  var search = searchParams.get('myID')


  //if(search == null){
    //router.push('/login');
    
  //}


  useEffect(() => {
    loadPage();
 }, []);


  const loadPage = async () =>{

    try{
      var acc = await accInfo(search);
      var firstName = acc.firstname;

      setName(firstName);


    } catch (error){
    console.log(error);
    }  


  
  } 




  function manageAccount(){

    router.push(`/accountmanage?myID=${search}`);

    
  }




  function signOut(){
    search = null;
    if(search == null){
      router.push('/login');
      
    }
  }

  
 

    return (
      <div>
      <h1>JSCA Dashboard</h1>
      <h2>Welcome {name}</h2>
      <br></br>
      <br></br>
      <button onClick={manageAccount}>Manage Account</button>
      <br></br>
      <br></br>

      <button onClick={signOut}>Log Out</button>
      </div>

      
    )
  }

export default Dashboard