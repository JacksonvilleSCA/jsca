"use client"
import React from 'react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditTwo from "@/app/components/EditTwo";
import NavTwo from "@/app/components/Nav2"

const Essay = ({params}) => {
console.log(params)
  const router = useRouter();
  const [details, setDetails] = useState("");

  const handleDetails = (content) => {
    setDetails(content); //Update essay contents 
  }

  const handleSubmit = (e) => {

      console.log("------------------------------------")

    e.preventDefault(); // Prevent default form submission
    if (!details){ 
      alert ("Please write your essay before submitting!"); 
      return; 
    }
    
    sessionStorage.setItem('essay', details); //store essay content in sessionstorage
    // router.push('/studentform'); //redirct to studentform after "submitting" 
    router.push(`/Dashboard/People/exchange/${ params.eventID}/${ params.eventID}`);
  }

  return (
    <div> 
      <NavTwo/> 
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <EditTwo  details={handleDetails}  />
        </div>
        <br />
        <div className = "col-sm-12 text-center">
        <button type="submit" value= "submit" className = "btn btn-primary">Submit Essay </button>

        </div>
      </form>
    </div>
    </div> 
  );
};

export default Essay;