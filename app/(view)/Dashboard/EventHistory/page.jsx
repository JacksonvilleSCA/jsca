"use client";

import React from "react";
import { useEffect, useState } from "react";
import { GET as getEvent } from "../../../api/routes/evemtRoute";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [eventInfomration, setEventInformation] = useState([]);

  // Utility function to check if two arrays are equal
  const areArraysEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvent();

      if (!areArraysEqual(eventInfomration, data)) {
        setEventInformation(data);
      }
    };
    fetchData();
  }, [eventInfomration]);

  return (
    <>
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {eventInfomration.map((event, index) => (
            <div class="col">
              <div
                key={event._id}
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
                    Trip to Tokyo, Japn
                  </div>
                  <hr />
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil ut quia veritatis porro doloribus cupiditate dolores
                    voluptas illum corrupti ratione.
                  </p>
                  <button
                    onClick={(e) => {
                      router.push(`/Dashboard/EventHistory/${event._id}/temp`);
                    }}
                    className="btn btn-primary px-5"
                    style={{ width: "100%" }}
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
