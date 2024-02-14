"use client";

import React, { useEffect, useState } from "react";
import { getEvent as GET } from "@/app/api/routes/evemtRoute";
import Image from "next/image";
import { Form } from "react-bootstrap";

export default function Page({ params }) {
  const [eventInfo, setEventInfo] = useState("");
  //userID can be used for the member currently signed in.
  const [userID, setUserID] = useState("");

  //This code checks to see if the user when accessing the page has an ID.
  useEffect(() => {
    var search = sessionStorage.getItem("uid");
    if (search == null) {
      //If no ID then kick back to login
      router.push("/login");
    } else {
      setUserID(search);
    }
    //Code above was added

    const fetchData = async () => {
      const data = await GET(params);
      setEventInfo(data);
    };
    fetchData();
  }, []);


  function postToWaitList(e){

      console.log(e.target.action)
      console.log("hello there")

      e.preventDefault();
  }

  return (
    <>

    <Form onSubmit={postToWaitList}>

      <div className="container mt-5">
        <div
          className="card"
          style={{
            width: "100%",
            boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
          }}
          >
          <div className="card-title text-center mt-3 mb-3">
            {eventInfo.location}
          </div>

          <div className="d-flex">
            <div>
              {eventInfo.img && (
                <Image
                alt="Picture of the Event"
                src={eventInfo.img}
                width={100}
                height={300}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                />
                )}
            </div>

            <div className="card-body" style={{ width: "100%" }}>
              <div>
                <h3> Time & Location </h3>
                <hr />
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  vel ipsa delectus reiciendis natus laborum ducimus similique
                  ratione dicta ullam.
                </p>
              </div>
              <div style={{ marginTop: "10%" }}>
                <h3>About the Event</h3>
                <hr />
                <p className="card-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
                  quas aperiam, perspiciatis dolorem illum possimus voluptate
                  voluptatem culpa vitae quam!
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-success"
                style={{
                  marginTop: "60px",
                  marginLeft: "100px",
                  width: "60%",
                  boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
                }}
                >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
      
    </>
  );
}




            {/* <div>
            {eventInfo.img.startsWith("data:image") ? (
              <img
                alt="Picture of the Event"
                src={eventInfo.img}
                width={100}
                height={422}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            ) : (
              <Image
                alt="Picture of the Event"
                src={eventInfo.img}
                width={100}
                height={300}
                style={{
                  width: "100%",
                  height: "100%"

                }}
              />
            )}
            </div> */}