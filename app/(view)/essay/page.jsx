"use client"
import React from 'react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditTwo from "@/app/components/EditTwo";

const Essay = () => {
  const router = useRouter();
  const [details, setDetails] = useState("");

  const handleDetails = (content) => {
    setDetails(content); //Update essay contents 
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!details){ 
      alert ("Please write your essay before submitting!"); 
      return; 
    }
    
    sessionStorage.setItem('essay', details); //store essay content in sessionstorage
    router.push('/studentform'); //redirct to studentform after "submitting" 
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <EditTwo  details={handleDetails}  />
        </div>
        <br />
        <div class = "col-sm-12 text-center">
        <button type="submit" value= "submit" class = "btn btn-primary">Submit Essay </button>
        </div>
      </form>
    </div>
  );
};

export default Essay;