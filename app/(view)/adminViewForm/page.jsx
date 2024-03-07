"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminViewForm = () => {
  const [studentId, setStudentId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const studentId = queryParams.get('studentId');
    if (studentId) {
      setStudentId(studentId);
      // Fetch and display the form for the student with the given ID
    }
  }, []);
  
  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>View Student Form Application </h1>
      <p>Student ID: {studentId}</p>
      {/* Display the form for the student with the given ID */}
    </div>
  );
};

export default AdminViewForm;
