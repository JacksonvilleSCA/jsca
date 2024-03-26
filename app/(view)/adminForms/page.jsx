"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllForms, getAllFormsTwo } from "@/app/api/routes/essayroutes";
import { Table } from "react-bootstrap";
import NavThree from "@/app/components/Nav3";
import FormModal from "@/app/components/FormModal";
import FormModalTwo from "@/app/components/FormModalTwo";
import { PostToEvent } from "@/app/api/routes/essayroutes";
import { RemoveFromEvent } from "@/app/api/routes/essayroutes";

const AdminForms = () => {
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

  // Utility function to check if two arrays are equal
  const AreArraysEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  const AreArraysEqualTwo = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  function Pop(id, email, eventID, formID) {
    console.log("hello");
    console.log(id);
    console.log(email);
    setActive({
      Active: true,
      id: id,
      email,
      eventID: eventID,
      formID: formID,
    });
  }

  function ReverserPop(holdValue) {
    if (holdValue.onActive) {
      setActive({ Active: false, id: holdValue.holdId });
    } else {
      setActive({ Active: holdValue.onActive, id: holdValue.holdId });
    }

    if (holdValue.onActive) {
      console.log("shades");
      console.log(active.id + " " + active.email + " " + active.eventID);
      PostToEvent({
        val: active.id,
        event: active.eventID,
        form: active.formID,
        email: active.email,
        check: "accept",
      });
      alert("A notice of acceptance has been to repaint");
    } else {
      console.log("not being called ++++++++");
    }
  }

  function PopTwo(id, email, eventID, formID) {
    setActive2({
      Active: true,
      id: id,
      email,
      eventID: eventID,
      formID: formID,
    });
  }

  function ReverserPopTwo(holdValue) {
    if (holdValue.onActive) {
      setActive2({ Active: false, id: holdValue.holdId });
    } else {
      setActive2({ Active: holdValue.onActive, id: holdValue.holdId });
    }

    if (holdValue.onActive) {
      console.log("shades");
      RemoveFromEvent({
        val: active2.id,
        event: active2.eventID,
        form: active2.formID,
        email: active2.email,
        check: "remove",
      });
      alert("Notice has been sent regarding removable from wait-list");
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const formsData = await getAllFormsTwo("one");
      console.log(formsData);
      setFroms(formsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forms: ", error);
      setLoading(true);
    }
  };

  const handleViewForm = (studentId) => {
    console.log(`/adminViewForm?studentId=${studentId}`);
    router.push(`/adminViewForm?studentId=${studentId}`);
  };
  const handleViewEssay = (studentId) => {
    console.log(`/adminViewEssay?studentId=${studentId}`);
    router.push(`/adminViewEssay?studentId=${studentId}`);
  };

  return (
    <div>
      <NavThree />

      {active2.Active && (
        <FormModalTwo
          value={active2.Active}
          value2={active2.id}
          reverse={ReverserPopTwo}
        />
      )}

      {active.Active && (
        <FormModal
          value={active.Active}
          value2={active.id}
          reverse={ReverserPop}
        />
      )}

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
                  <th>Event Location</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {forms.map(
                  (form, index) =>
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
                          <a
                            className="btn btn-primary"
                            href={`/Dashboard/EventHistory/${form.event}/temp/${form.event}/`}
                            role="button"
                            onClick={() => handleViewEssay(form._id)}
                          >
                            Event
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={(e) =>
                              Pop(
                                form.student,
                                form.parentemail,
                                form.event,
                                form._id
                              )
                            }
                          >
                            Approve
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) =>
                              PopTwo(
                                form.student,
                                form.parentemail,
                                form.event,
                                form._id
                              )
                            }
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForms;
