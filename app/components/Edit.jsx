"use client";
import React, { useState } from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Edit = (props) => {

    
  const editorRef = useRef(null);

  function one(editor){
    props.details(editorRef.current.getContent());
  }
  
  return (
    <>
      <Editor
        id="1"
        apiKey="mnjsi8c00iga0yq3zcnsif090me3lskqlwtz5y5mmr6twwdg"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={one}
        initialValue = {props.currentDetails}
        init={{
          // height: 400,
          menubar: false,
          plugins:[
            'anchor','autolink','charmap','codesample','emoticons','image','link','lists','media','searchreplace','table','visualblocks','wordcount'
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
      />
    </>
  );
};

export default Edit;
