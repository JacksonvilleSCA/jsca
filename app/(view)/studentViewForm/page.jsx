"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllForms } from '@/app/api/routes/essayroutes';
import NavTwo from "@/app/components/Nav2"

const StudentViewForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const formsData = await getAllForms();
        // Get the user ID from the session or context
        const userId = sessionStorage.getItem('uid'); 
        // Find the form data where the user ID matches the ID stored in the form
        const studentForm = formsData.find(form => form.user === userId);
        if (studentForm) {
          setFormData(studentForm);
        } else {
          // Redirect the user if the form is not found
          router.push('/dashboard'); 
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);
  return (
  <div> 
    <NavTwo/> 
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>Your Application </h1>
      <div className='mb-3'> 
          <a class="btn btn-primary me-2" href='/LoginDashboard' role="button">Back to Dashboard </a>
      </div>
       
     
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-primary text-white">
              <div className="card-body">
                {formData && (
                 <div>
                    <p>Student ID: {formData._id}</p>
                    <p>First Name: {formData.firstName}</p>
                    <p>Last Name: {formData.lastName}</p>
                    <p> Middle Name: {formData.middleName} </p> 
                    <p> Perferred Name: {formData.perferredName} </p>
                    <p>Student Phone Number:  {formData.studentPhone}</p>
                    <p> Sex: {formData.sex} </p>
                    <p> Date of Birth: {formData.dob.toLocaleDateString()} </p>
                    <p> School: {formData.school} </p>
                    <p> Grade Level: {formData.grade} </p>
                    {/* add Programs of Interest */}
                    <p> Have a passport: {formData.passport} </p>
                    <p> Passport Country: {formData.passportCount} </p>
                    <p> Passport Expiration Date: {formData.passportexp.toLocaleDateString()}</p>
                    <p> Allgeries: {formData.allergies} </p>
                    <h4> SECTION TWO </h4>
                    <p> Parent Name: {formData.parentname} </p>
                    <p> Second Parent Name: {formData.parenttwoname} </p>
                    <p> Street : {formData.street} </p>
                    <p> City: {formData.city} </p>
                    <p> State: {formData.state} </p>
                    <p> Zip: {formData.zip} </p>
                    <p> First Parents Phone Number: {formData.parentphone} </p>
                    <p> Second Parents Phone Number: {formData.parenttwophone} </p>
                    <p> Email: {formData.parentemail} </p>
                    <p> Parent signed on: {formData.signdate.toLocaleDateString()}</p>
                    <p> Host Family and/or Travel: {formData.host}  </p>
                    <p> Willing to host a family? {formData.hostfam} </p>
                    <p> Essay: {formData.essay} </p>

                    <p> </p>
                    
                 
                </div>
                )}
             </div> 
            </div> 
           </div> 
        </div> 
        
      </div> 
    </div>
   </div> 
  );
};

export default StudentViewForm;
