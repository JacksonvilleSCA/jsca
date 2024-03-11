"use client";
import React, { useEffect, useState } from "react";
import { getEvent as GET } from "@/app/api/routes/evemtRoute";
import Image from "next/image";
import { getEventItinerary } from "@/app/api/routes/itineraryroute";
import { GETROUTE } from "@/app/api/routes/plroute";


export default function Page({ params }) {

  const [itineraryInfo, setItineraryInfo] = useState({});
  const [packingListInfo, setPackingListInfo] = useState({});
  const [eventInfo, setEventInfo] = useState({});
  //userID can be used for the member currently signed in. 
  const [userID, setUserID] = useState("")

  //This code checks to see if the user when accessing the page has an ID.
  useEffect(() => {
    var search = sessionStorage.getItem('uid');
    if (search == null) {
      //If no ID then kick back to login
      router.push('/login');
    } else {
      setUserID(search)
    }
    //Code above was added

    const fetchData = async () => {
      const { props: { data } } = await GET(params);
      setEventInfo(data);
      console.log(data)
    };
    fetchData();

  }, []);

  //use effect for the itinerary information based on ID 
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const { props: { itinerary } } = await getEventItinerary(params);
        // const itinerary = await getEventItinerary(params)
        setItineraryInfo(itinerary);
        console.log(itinerary);
      } catch (error) {
        console.log('Error fetching id for itinerary', error);
        throw error;
      }
    };

    fetchItinerary();
  }, []);

  //use effect for the packing list information based on ID 
  useEffect(() => {

    const fetchPackingList = async () => {
      try {
        const { props: { packlist } } = await GETROUTE(params);

        setPackingListInfo(packlist);

        console.log(packlist);
      } catch (error) {
        console.log("Error fetching id for packing list", error);
        throw error;
      }
    };

    fetchPackingList();

  }, []);

  return (
    <>
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
              {eventInfo.img &&
                <Image
                  alt="Picture of the Event"
                  src={eventInfo.img}
                  width={100}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />}

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
                type="button"
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


      <div className="container mt-5">
        <div className="card mx-auto w-100">
          <div className="card-body">
            <button
              type="button"
              data-bs-toggle='collapse'
              data-bs-target='#multiCollapse'
              aria-expanded='false'
              aria-controls='multiCollapse'
              className="btn btn-success"
              style={{

                boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
              }}>
              Event information
            </button>
            <div className="collapse" id='multiCollapse'>
              <div className="card card-body mt-2">

                <p>Itinerary for: {itineraryInfo.title}</p>

                {itineraryInfo.schedule?.map((item, index) => (
                  <div key={index}>
                    <p>Day: {item.day}</p>
                    <p>Details: {item.activity}</p>
                    <p>Time: {item.time}</p>
                  </div>
                ))}

                {/*               
                {itineraryInfo ? (
                    {itineraryInfo.map((item, index) =>(

                    ))};
                  <h1>{itineraryInfo.title}</h1>


                ): (<p>Loading...</p> )} */}


              </div>
              <div className="card card-body mt-5">
                 <p>Recommended items to bring</p> 
                {packingListInfo.items?.map((item, index) =>(
                  <div key={index}>
                    <p>item: {item}</p>
                    </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}
