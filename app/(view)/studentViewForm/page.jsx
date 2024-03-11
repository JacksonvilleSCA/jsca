"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GET } from '@/app/api/routes/essayroutes'; // Import the GET function to fetch form data from the backend

const ApplicationDisplay = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch form data from the backend
        const response = await GET(); // Assuming there's a GET function to retrieve form data
        setFormData(response.data); // Set the form data in state
      } catch (error) {
        console.error('Error fetching form data:', error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  if (!formData) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div>
      <h1>Application Display</h1>
      <h2>Student&apos;s Information</h2>
      <p>Last Name: {formData.lastName}</p>
      <p>First Name: {formData.firstName}</p>
      <p>Middle Name: {formData.middleName} </p>
      <p> Perferred Name: {formData.perferredname} </p>
      <p> Student Phone: {formData.studentPhone} </p>
      <p> Date of Birth: {formData.dob} </p>

    <br> </br>
      <h2>Essay</h2>
      <p>{formData.essay}</p> {/* Render the essay content */}
    </div>
  );
};

export default ApplicationDisplay;
