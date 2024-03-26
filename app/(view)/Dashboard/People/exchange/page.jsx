"use client";

import React, { Suspense, useEffect, useState } from "react";
import { GET as GetEvent } from "../../../../api/routes/evemtRoute";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Image from "next/image";
// import Loading from "./loading";
import NavTwo from "@/app/components/Nav2";

export default function Page() {


  const router = useRouter();

  const [eventInformation, setEventInformation] = useState([]);

  // Utility function to check if two arrays are equal
  const AreArraysEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  useEffect(() => {
    var search = sessionStorage.getItem('uid');
    if(search == null){
      router.push('/login');
    }
    const fetchData = async () => {
      const data = await GetEvent();
     
      if (!AreArraysEqual(eventInformation, data)) {
        setEventInformation(data);
      }
    };
    fetchData();
  }, [eventInformation]);

  return (
<>
  <NavTwo />
  <div className="container" style={{ marginBottom: "30px" }}>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {eventInformation.map((event, index) => (
        event.event === "Exchange" && event.active && (
          <div key={event._id} className="col">
            <div
              className="card mt-5"
              style={{
                width: "80%",
                boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {event.img.startsWith("data:image") ? (
                <img
                  alt="Picture of the Event"
                  src={event.img}
                  width={100}
                  height={300}
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                <Image
                  alt="Picture of the Event"
                  src={event.img}
                  width={100}
                  height={300}
                  style={{
                    width: "100%",
                  }}
                />
              )}

              <div className="card-body" style={{ position: "relative" }}>
                <div className="card-title" style={{ textAlign: "center" }}>
                  {event.location}
                </div>
                <hr />
                <div className="card-text">
                  <div
                    className="card-text"
                    style={{
                      height: "280px",
                      overflow: "hidden",
                      overflowY: "scroll",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: event.details }}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    router.push(`/Dashboard/People/exchange/${event._id}`);
                  }}
                  className="btn btn-primary px-5"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  </div>
</>

  );
}
