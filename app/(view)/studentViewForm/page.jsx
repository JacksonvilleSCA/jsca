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
      <NavTwo /> 
        <h1 style={{ textAlign: 'center' }}>Your Application </h1>
        <div className='mb-3'> 
          <a class="btn btn-primary me-2 " href='/LoginDashboard' role="button">Back to Dashboard </a>
        </div>

        <div className="container">
          <div className="row justify-content-center" >
            <div className="col-md-10">
            <div className="card bg-light" style={{ border: '6.5px solid #007bff' }}>
                <div className="card-body">
                  {formData && (
                    <div>
                     <div className="row mb-3">
                        <div className="col">
                          <p>First Name: {formData.firstName}</p>
                         </div>
                         <div className="col">
                           <p>Last Name: {formData.lastName}</p>
                         </div>
                      </div> 
                      <div className = "row mb-3">
                        <div className="col">
                          <p>Middle Name: {formData.middleName}</p> 
                        </div>
                        <div className="col">
                          <p>Preferred Name: {formData.perferredName}</p>
                        </div>
                      </div> 

                      <div className="row mb-3">
                        <div className="col">
                          <p>Student Phone Number:  {formData.studentPhone}</p>
                        </div>
                        <div className="col">
                          <p>Sex: {formData.sex}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                       <div className="col">
                        <p>Date of Birth: {new Date(new Date(formData.dob).setDate(new Date(formData.dob).getDate() + 1)).toLocaleDateString()}</p>
                      </div>

                        <div className="col">
                          <p>Grade Level: {formData.grade}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col">
                          <p>School: {formData.school}</p>
                        </div>
                        <div className="col">
                          <p>Have a passport: {formData.passport}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col">
                          <p>Passport Expiration Date: {new Date(new Date(formData.passportexp).setDate(new Date(formData.passportexp).getDate() + 1)).toLocaleDateString()}</p>
                        </div>
                        <div className="col">
                          <p>Passport Country: {formData.passportCount}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col">
                          <p>Allergies: {formData.allergies}</p>
                        </div>
                      </div>

                     {/*} <h4 style={{ textAlign: 'right-centered' }}>Section Two</h4> */} 

                      <div className="row mb-3">
                        <div className="col">
                          <p>Parent Name: {formData.parentname}</p>
                        </div>
                        <div className="col">
                          <p>Second Parent Name: {formData.parenttwoname}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col">
                          <p>Street: {formData.street}</p>
                        </div>
                        <div className="col">
                          <p>Zip: {formData.zip}</p>
                        </div>
                      </div>
                      <div className = "row mb-3"> 
                        <div className="col">
                          <p>City: {formData.city}</p>
                        </div>
                        <div className="col">
                          <p>State: {formData.state}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col">
                          <p>First Parent's Phone Number: {formData.parentphone}</p>
                        </div>
                        <div className="col">
                          <p>Second Parent's Phone Number: {formData.parenttwophone}</p>
                        </div>
                      </div> 
                      <div className="row mb-3">
                        <div className="col">
                          <p>Email: {formData.parentemail}</p>
                        </div>
                        <div className="col">
                          <p>Parent signed on: {new Date(new Date(formData.signdate).setDate(new Date(formData.signdate).getDate() + 1)).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <p>Host Family and/or Travel: {formData.host}</p>
                        </div>
                        <div className="col">
                          <p>Willing to host a family? {formData.hostfam}</p>
                        </div>
                      </div>
                      <p> Essay: </p>
                      <div className="container" style={{ border: '3px solid black' }}>
                           <div dangerouslySetInnerHTML={{ __html: formData.essay }} /> 
                      </div> 
                        
                     
                    </div>
                  )}
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
     
    </div>
  );
};

export default StudentViewForm;
