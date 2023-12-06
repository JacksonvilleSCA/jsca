'use client'
import React from 'react';
import Link from 'next/link'; 
import { useState } from 'react';

const esay = () => {
    const [text, setText] = useState('');
    const minWordCount = 10;
    const maxWordCount = 10000;
  
    const handleTextChange = (event) => { 
      const inputText = event.target.value;
      const words = inputText.split(/\s+/); // Split the text into words
      const wordCount = words.filter((word) => word !== '').length;
      setText(inputText);
  
      // Check if the word count is within the specified range
      if (wordCount >= minWordCount && wordCount <= maxWordCount) {
        setText(inputText);
      }
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
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type your text here..."
          rows={44}
          cols={103}
        />
        <div>
          Word Count: {text.split(/\s+/).filter((word) => word !== '').length}
        </div>

      </div>
    );
  };
  
  export default esay;
