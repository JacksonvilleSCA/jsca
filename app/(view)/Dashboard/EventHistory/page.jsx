"use client";

import React from "react";
import { useEffect, useState } from "react";
import { GET as GetEvent } from "../../../api/routes/evemtRoute";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  const [eventInformation, setEventInformation] = useState([]);

  // Utility function to check if two arrays are equal
  const AreArraysEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEvent();

      // console.log(data)

      // console.log("hello")
      if (!AreArraysEqual(eventInformation, data)) {
        setEventInformation(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {eventInformation.map((event, index) => (
            <div key={event._id} className="col">
              <div
                className="card mt-5"
                style={{ width: "80%", boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)", position: "relative"}}
              >
                {
                  event.active === false &&
                <div style={{backgroundColor: "gray", width: "100%", zIndex: "1", height: "100%", opacity: '25%', position: "absolute"}}> </div>
                }


                  {/* {event.img &&  
                                  <Image
                                  alt="Picture of the Event"
                                  src={event.img}
                                  width={100}
                                  height={300}
                                  style={{
                                    width: '100%',
                                  }}
                                />
                  } */}

{event.img.startsWith('data:image') ? (
  <img
    alt="Picture of the Event"
    src={event.img}
    width={100}
    height={300}
    style={{
      width: '100%',
    }}
  />
) : (
  <Image
    alt="Picture of the Event"
    src={event.img}
    width={100}
    height={300}
    style={{
      width: '100%',
    }}
  />
)}





                <div className="card-body" style={{position: "relative"}}>
                  <div className="card-title" style={{ textAlign: "center" }}>
                    {event.location}
                  </div>
                  <hr />
                  <div className="card-text">
                  {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.details) }} />
                   */}
                  <div dangerouslySetInnerHTML={{ __html: event.details }} />

                  </div >
                  <button
                    onClick={(e) => {
                      router.push(`/Dashboard/EventHistory/${event._id}/temp`);
                    }}
                    className="btn btn-primary px-5"
                    style={{ width: "100%",position: "relative", zIndex: "2"}}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}