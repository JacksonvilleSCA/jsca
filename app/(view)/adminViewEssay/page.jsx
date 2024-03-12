"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllForms } from '@/app/api/routes/essayroutes';
import NavThree from '@/app/components/Nav3';

const AdminViewEssay = () => {
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
  
  const handleViewForm = (studentId) => {
    console.log(`/adminViewForm?studentId=${studentId}`); 
    router.push(`/adminViewForm?studentId=${studentId}`);

  }
  

  return (
    <div> 
    <NavThree/> 
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>View Student Essay</h1>
      <div className='mb-3'> 
          <a class="btn btn-primary" href='/admindashboard' role="button">Back to Dashboard </a>
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
                    <p> Essay: {studentData.essay} </p> 
                    <a class="btn btn-secondary me-2" href={`/adminViewForm?studentId=${studentData._id}`} role="button" onClick={() => handleViewForm(studentData._id)}> View Form  </a>
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

export default AdminViewEssay;
