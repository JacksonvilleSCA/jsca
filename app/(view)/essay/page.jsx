'use client'
import React from 'react';
import Link from 'next/link'; 
import { useState } from 'react';
import { POST } from '@/app/api/routes/essayroutes';

const Essay = () => {
    const [text, setText] = useState('');
   
    const handleTextChange = (event) => { 
      const inputText = event.target.value;
      const words = inputText.split(/\s+/); // Split the text into words
      const wordCount = words.filter((word) => word !== '').length;
      setText(inputText);
  
    };
  
  
    const handleFormatClick = (format) => {
      document.execCommand(format, false, null);
    };
  
    return (
      <div>
       <div> 
        <button onClick={() => handleFormatClick('bold')}>Bold</button>
        <button onClick={() => handleFormatClick('italic')}>Italic</button>
        <button onClick={() => handleFormatClick('underline')}>Underline</button>
        </div>
        <form action={POST}> 
        <textarea
         // value={text}
          name = "essay"
          onChange={handleTextChange}
          placeholder="Type your text here..."
          rows={44}
          cols={103}

        />
        <div>
          Word Count: {text.split(/\s+/).filter((word) => word !== '').length}
        </div>
        <button type = "submit" value= "submit" >  Submit</button>
        </form>
      </div>
    );
  };
  
  export default Essay;
