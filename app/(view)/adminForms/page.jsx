"use client"
import React, {useState, useEffect } from 'react';
import Link from 'next/link';  
import {useRouter} from "next/navigation"; 
import { getAllForms } from '@/app/api/routes/essayroutes';
import { Table } from 'react-bootstrap';

const adminForms = () => {
  const[forms, setFroms] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter(); 

  useEffect(() => {
    fetchForms(); 
  }, []); 

  const fetchForms = async () => {
    try {
      const formsData = await getAllForms(); 
      setFroms(formsData); 
      setLoading(false); 
    } catch(error) {
      console.error('Error fetching forms: ', error ); 
      setLoading(true); 
    }
  }

    return (
      <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>Exchange Program Applications </h1>
      <div className='mb-3'> 
          <a class="btn btn-primary" href='/admindashboard' role="button">Back to Dashboard </a>
      </div>
      <div style={{ backgroundColor: '#007bff', padding: '20px', borderRadius: '10px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto'}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{form.firstName}</td>
                <td>{form.lastName}</td>
                {/* <td>
                  <Link href={`/adminFormDetails/${form._id}`}>
                    <Button variant="info" className="me-2">View Form</Button>
                  </Link>
                  <Link href={`/adminEssayDetails/${form._id}`}>
                    <Button variant="success">View Essay</Button>
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </div> 
      </div>
      );
    };
    
    
    
    export default adminForms;