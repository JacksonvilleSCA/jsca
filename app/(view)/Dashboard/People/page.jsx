"use client"

import React, { useEffect, useState } from 'react'
import { GET as GetEvent } from "../../../api/routes/evemtRoute";
import { useRouter } from "next/navigation";


export default function Page(){
  const router = useRouter();

  const [eventInformation, setEventInformation] = useState([]);

    // Utility function to check if two arrays are equal
    const AreArraysEqual = (array1, array2) => {
      return JSON.stringify(array1) === JSON.stringify(array2);
    };
  
    useEffect(() => {
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
    <div className="container" style={{ marginBottom: "30px" }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {eventInformation.map((event, index) => (

            <div key={event._id} className="col">

              {event.active && 

              <div
                className="card mt-5"
                style={{ width: "80%", boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)" }}
              >
                <img
                  src="https://picsum.photos/200"
                  className="card-img-top"
                  alt="image"
                />
                <div className="card-body">
                  <div className="card-title" style={{ textAlign: "center" }}>
                    {event.location}
                  </div>
                  <hr />
                  <p className="card-text">
                   {event.details}
                  </p>
                  <button
                    onClick={(e) => {
                      router.push(`/Dashboard/People/${event._id}`);
                    }}
                    className="btn btn-primary px-5"
                    style={{ width: "100%" }}
                  >
                    More Info 
                  </button>
                </div>
              </div>
                  }
            </div>
          ))}
        </div>
      </div>
 
 </>
  )
}