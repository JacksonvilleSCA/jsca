"use client";

import React from "react";
import { useEffect, useState } from "react";
import { GET as GetEvent } from "../../../api/routes/evemtRoute";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavThree from "@/app/components/Nav3";
import { Roboto } from "next/font/google";
import { Merriweather } from "next/font/google";
import { Ubuntu } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  const router = useRouter();

  const [eventInformation, setEventInformation] = useState([]);

  useEffect(() => {
    var search = sessionStorage.getItem("AID");
    if (search == null) {
      router.push("/login");
    }

    const fetchData = async () => {
      const data = await GetEvent();
      setEventInformation(data);
      console.log(data)
      // Format time for each event in the data array
      const formattedData = data.map((event) => ({
        ...event,
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),
      }));

      setEventInformation(formattedData);
    };

    fetchData();
  }, []);

  function formatTime(timeString) {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const formattedTime = date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    return formattedTime;
  }

  return (
    <>
      <NavThree />
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {eventInformation.map((event, index) => (
            <div key={event._id} className="col">
              <div
                className="card mt-5"
                style={{
                  width: "100%",
                  backgroundColor: index % 2 === 0 ? "#C4E4FF" : "#DFF5FF",
                  boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >

              <div style={{
                width: '50px',  
                height: '50px',
                borderRadius: '50%', 
                backgroundColor: 'lightblue',
                position: 'relative',
                top:'10px',
                left: '352px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}> {event.event === "Standard"? "L" : "E"}  </div>



                {event.active === false && (
                  <div
                    style={{
                      backgroundColor: "#272727",
                      width: "100%",
                      zIndex: "1",
                      height: "100%",
                      opacity: "30%",
                      position: "absolute",
                    }}
                  >
                    {" "}
                  </div>
                )}

                <div className="card-body" style={{ position: "relative" }}>
                  <div className="card-title" style={{ textAlign: "center" }}>
                    <h2 className={merriweather.className}>
                      {" "}
                      {event.location}
                    </h2>
                  </div>
                  <hr />
                  <h3 className={roboto.className}> Time</h3>
                  <h5 className={ubuntu.className}>
                    {event.startTime} - {event.endTime}
                  </h5>
                  <hr />
                  <h3> Event Detail</h3>
                  <div
                    className="card-text"
                    style={{
                      height: "280px",
                      overflow: "hidden",
                      overflowY: "scroll",
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: event.details }} />
                  </div>

                  <button
                    onClick={(e) => {
                      router.push(`/Dashboard/EventHistory/${event._id}/temp`);
                    }}
                    className="btn btn-primary px-5"
                    style={{
                      width: "100%",
                      position: "relative",
                      zIndex: "2",
                      marginTop: "20px",
                    }}
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
