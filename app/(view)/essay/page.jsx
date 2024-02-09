'use client'
import React, { useState } from "react";
import Link from 'next/link'; 
import { POST } from '@/app/api/routes/essayroutes';
import { useRef } from "react";
import EditTwo from "@/app/components/EditTwo";

const Essay = (props) => {

  const [details, setDetails] = useState("");
  const [textarea, setTextarea] = useState("");
  
   
   // const editorRef = useRef(null);

  
    return (
      <div>
        <form action = {POST}> 
          <div className = "page-container"> 

          <EditTwo valueOfTextarea={textarea} details={setDetails} />
            <input type="hidden" value={details}  name="essay" />
           </div>
        <br></br>
        <button type = "submit" value= "submit" class="btn btn-primary">  Submit</button>
        </form>
      </div>
    );
  };
  
  export default Essay;
