"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllForms } from '@/app/api/routes/essayroutes';
import {DELETE} from '@/app/api/routes/essayroutes';
import NavThree from '@/app/components/Nav3';

const AdminViewForm = () => {
  const [studentData, setStudentData] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const studentId = queryParams.get('studentId');
    if (studentId) {
      setStudentId(studentId); // Set the studentId state
      fetchStudentData(studentId);
    }
  }, []); 

  
  const fetchStudentData = async (studentId) => {
    try {
      const formsData = await getAllForms();
      const student = formsData.find(form => form._id === studentId);
      console.log(student); 
      setStudentData(student);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  const handleDelete = async () => {
    try {
      await DELETE(studentId); // Make the API call to delete the form
      // Redirect the user to the admin dashboard or any other appropriate page
      router.push('/adminForms');
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };
  
  const handleViewEssay = (studentId) => {
    console.log(`/adminViewEssay?studentId=${studentId}`); 
    router.push(`/adminViewEssay?studentId=${studentId}`);

  }
  

  return (
  <div> 
    <NavThree/> 
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>View Student Application</h1>
      <div className='mb-3'> 
          <a class="btn btn-primary me-2" href='/admindashboard' role="button">Back to Dashboard </a>
          <a class="btn btn-primary" href='/adminForms' role="button">Back to all Student Applications </a>
      </div>
       
     
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-primary text-white">
              <div className="card-body">
                {studentData && (
                 <div>
                    <p>Student ID: {studentData._id}</p>
                    <p>First Name: {studentData.firstName}</p>
                    <p>Last Name: {studentData.lastName}</p>
                    <p> Middle Name: {studentData.middleName} </p> 
                    <p> Perferred Name: {studentData.perferredName} </p>
                    <p>Student Phone Number:  {studentData.studentPhone}</p>
                    <p> Sex: {studentData.sex} </p>
                    <p> Date of Birth: {studentData.dob.toLocaleDateString()} </p>
                    <p> School: {studentData.school} </p>
                    <p> Grade Level: {studentData.grade} </p>
                    {/* add Programs of Interest */}
                    <p> Have a passport: {studentData.passport} </p>
                    <p> Passport Country: {studentData.passportCount} </p>
                    <p> Passport Expiration Date: {studentData.passportexp.toLocaleDateString()}</p>
                    <p> Allgeries: {studentData.allergies} </p>
                    <h4> SECTION TWO </h4>
                    <p> Parent Name: {studentData.parentname} </p>
                    <p> Second Parent Name: {studentData.parenttwoname} </p>
                    <p> Street : {studentData.street} </p>
                    <p> City: {studentData.city} </p>
                    <p> State: {studentData.state} </p>
                    <p> Zip: {studentData.zip} </p>
                    <p> First Parents Phone Number: {studentData.parentphone} </p>
                    <p> Second Parents Phone Number: {studentData.parenttwophone} </p>
                    <p> Email: {studentData.parentemail} </p>
                    <p> Parent signed on: {studentData.signdate.toLocaleDateString()}</p>
                    <p> Host Family and/or Travel: {studentData.host}  </p>
                    <p> Willing to host a family? {studentData.hostfam} </p>

                    <p> </p>
                    <a class="btn btn-secondary me-2" href={`/adminViewEssay?studentId=${studentData._id}`} role="button" onClick={() => handleViewEssay(studentData._id)}> View Essay  </a>
                    <a class="btn btn-secondary me-2" role = "button"> Approve </a>
                    <button class="btn btn-secondary me-2" onClick={handleDelete}> Delete </button>
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

export default AdminViewForm;
