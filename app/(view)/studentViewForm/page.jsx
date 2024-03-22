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
                  <div class = "row"> 
                    <div class = "col"> 
                      <p>First Name: {formData.firstName}</p>
                    </div> 
                    <div class = "col"> 
                      <p>Last Name: {formData.lastName}</p>
                    </div> 
                    <div class = "col"> 
                      <p> Middle Name: {formData.middleName} </p> 
                    </div> 
                  </div> {/* first row */} 
                  <div class = "row"> 
                    <div class = "col"> 
                      <p> Perferred Name: {formData.perferredName} </p>
                    </div> 
                    <div class = "col"> 
                      <p>Student Phone Number:  {formData.studentPhone}</p>
                    </div> 
                  </div> {/* second row */} 
                  <div class = "row"> 
                    <div class = "col"> 
                      <p> Sex: {formData.sex} </p>
                    </div> 
                    <div class = "col"> 
                      <p> Date of Birth: {formData.dob.toLocaleDateString()} </p>
                    </div> 
                    <div class = "col"> 
                      <p> Grade Level: {formData.grade} </p>
                    </div> 
                   </div> {/* third row */}  
                   <div class = "row"> 
                    <div class = "col"> 
                      <p> School: {formData.school} </p>
                    </div>
                    </div> {/* fourth row */} 

                    {/* add Programs of Interest */}
                    <div class = "row"> 
                      <div class = "col"> 
                        <p> Have a passport: {formData.passport} </p>
                      </div> 
                      <div class = "col"> 
                       <p> Passport Expiration Date: {formData.passportexp.toLocaleDateString()}</p>
                      </div> 
                      <div class = "col"> 
                       <p> Passport Country: {formData.passportCount} </p>
                      </div> 
                    </div> {/* fifth row */} 
                    <p> Allgeries: {formData.allergies} </p>

                    <h4 style={{ textAlign: 'center' }}> SECTION TWO </h4>
                    <div class = "row"> 
                      <div class = "col"> 
                        <p> Parent Name: {formData.parentname} </p>
                      </div> 
                      <div class = "col"> 
                        <p> Second Parent Name: {formData.parenttwoname} </p>
                      </div> 
                    </div> {/* row */} 
                    <p> Street : {formData.street} </p>
                    <div class = "row"> 
                      <div class = "col"> 
                        <p> City: {formData.city} </p>
                      </div> 
                      <div class = "col"> 
                        <p> State: {formData.state} </p>
                      </div> 
                      <div class = "col"> 
                        <p> Zip: {formData.zip} </p>
                      </div> 
                    </div> {/* row */} 
                    <p> First Parents Phone Number: {formData.parentphone} </p>
                    <p> Second Parents Phone Number: {formData.parenttwophone} </p>
                    <p> Email: {formData.parentemail} </p>
                    <p> Parent signed on: {formData.signdate.toLocaleDateString()}</p>
                    <div class = "row"> 
                      <div class = "col"> 
                        <p> Host Family and/or Travel: {formData.host}  </p>
                      </div> 
                      <div class = "col"> 
                       <p> Willing to host a family? {formData.hostfam} </p>
                      </div> 
                    </div> {/* row */}
                    <p> Essay: <div dangerouslySetInnerHTML={{ __html: formData.essay }} /> </p>

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
