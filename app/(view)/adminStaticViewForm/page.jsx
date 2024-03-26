"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllForms } from "@/app/api/routes/essayroutes";
import { getAllFormsTwo } from "@/app/api/routes/essayroutes";
import { Table } from "react-bootstrap";
import NavThree from "@/app/components/Nav3";
import { clearConfig } from "dompurify";

const AdminForms = (param) => {
  // console.log(param)

  console.log(Object.values(param.searchParams));
  let hold = Object.values(param.searchParams);
  console.log(hold[0]);

  const [forms, setFroms] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [active, setActive] = useState({
    Active: false,
    id: -1,
    email: " ",
    eventID: " ",
    formID: " ",
  });
  const [active2, setActive2] = useState({
    Active: false,
    id: -1,
    email: " ",
    eventID: " ",
    formID: " ",
  });

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const formsData = await getAllFormsTwo();
      console.log(formsData);
      setFroms(formsData);
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  };

  const handleViewForm = (studentId) => {
    router.push(`/adminViewForm?studentId=${studentId}`);
  };
  const handleViewEssay = (studentId) => {
    router.push(`/adminViewEssay?studentId=${studentId}`);
  };

  return (
    <div>
      <NavThree />
      <div className="page-container">
        <h1 style={{ textAlign: "center" }}>Exchange Program Applications </h1>
        <div className="mb-3">
          <a className="btn btn-primary" href="/admindashboard" role="button">
            Back to Dashboard{" "}
          </a>
        </div>
        <div
          style={{
            backgroundColor: "#007bff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Form</th>
                  <th>Essay</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{form.firstName}</td>
                    <td>{form.lastName}</td>
                    <td>
                      <a
                        className="btn btn-primary me-2"
                        href={`/adminViewForm?studentId=${form._id}`}
                        role="button"
                        onClick={() => handleViewForm(form._id)}
                      >
                        {" "}
                        View Form{" "}
                      </a>
                    </td>
                    <td>
                      <a
                        className="btn btn-primary"
                        href={`/adminViewEssay?studentId=${form._id}`}
                        role="button"
                        onClick={() => handleViewEssay(form._id)}
                      >
                        {" "}
                        View Essay{" "}
                      </a>
                    </td>
                    <td>
                      {form.active && (
                        <div className="text-success">Approve</div>
                      )}
                      {!form.active && (
                        <div className="text-danger">Reject</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForms;
