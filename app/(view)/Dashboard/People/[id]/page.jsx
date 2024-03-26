"use client";
import React, { useEffect, useState } from "react";
import { getEvent as GET, PostWaitList } from "@/app/api/routes/evemtRoute";
import Image from "next/image";
import { Form } from "react-bootstrap";
import EventModalOne from "@/app/components/EventModalOne";
import EventModalTwo from "@/app/components/EventModalTwo";
import { GetMemberListStatus } from "@/app/api/routes/evemtRoute";
import { contactMember } from "@/app/api/routes/memberContact";
import { getEventItinerary } from "@/app/api/routes/itineraryroute";
import { GETROUTE } from "@/app/api/routes/plroute";
import { useRouter } from "next/navigation";
import NavTwo from "@/app/components/Nav2";

export default function Page({ params }) {
  const [eventInfo, setEventInfo] = useState("");
  //userID can be used for the member currently signed in.
  const [userID, setUserID] = useState("");

  const [active, setActive] = useState({ Active: false, id: -1, email: " " });
  const [active2, setActive2] = useState({ Active: false, id: -1, email: " " });

  const [itineraryInfo, setItineraryInfo] = useState({});
  const [packingListInfo, setPackingListInfo] = useState({});

  const [adminEmail, setAdminEmail] = useState("");
  const [userStatus, setUserStatus] = useState("");


  const router = useRouter();


  // This code checks to see if the user when accessing the page has an ID.
  useEffect(() => {
    let id;
    var search = sessionStorage.getItem("uid");
    if (search == null) {
      //If no ID then kick back to login
      router.push("/login");
    } else {
      setUserID(search);
      id = search;
    }
    //Code above was added

    const fetchData = async () => {
      const data = await GetMemberListStatus({ params, id });
      setEventInfo(data.data);
      setAdminEmail(data.data);
      setUserStatus(data.status);
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

  console.log(userID)

  async function postToWaitList(e) {
    const res = await PostWaitList({ eventID: params.id, userID: sessionStorage.getItem('uid') });

    if (res.Bad) {
      alert("You are already in the wait-list");
    } if (res.Good) {
      alert("You have been added to the wait-list");
    }
    router.push("/Dashboard/People");

  }



  function Pop(id, email) {
    setActive({ Active: true, id: id, email });
  }

  function ReverserPop(holdValue) {
    if (holdValue.onActive) {
      setActive({ Active: false, id: holdValue.holdId });
    } else {
      setActive({ Active: holdValue.onActive, id: holdValue.holdId });
    }

    if (holdValue.onActive) {
      alert("Admin has been notify regarding your wait list removal");
      contactMember(adminEmail);
      router.push("/Dashboard/People");
    } else {
      console.log("not being called ++++++++")
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - 

  function PopTwo(id, email) {
    setActive2({ Active: true, id: id, email });
  }

  function ReverserPopTwo(holdValue) {
    if (holdValue.onActive) {
      setActive2({ Active: false, id: holdValue.holdId });
    } else {
      setActive2({ Active: holdValue.onActive, id: holdValue.holdId });
    }

    if (holdValue.onActive) {
      alert("Admin has been notify regarding your approve list removal");
      contactMember(adminEmail);
      router.push("/Dashboard/People");
    }
  }
  return (
    <>
      <NavTwo />

      {active2.Active && (
        <EventModalTwo
          value={active2.Active}
          value2={active2.id}
          reverse={ReverserPopTwo}
        />
      )}

      {active.Active && (
        <EventModalOne
          value={active.Active}
          value2={active.id}
          reverse={ReverserPop}
        />
      )}

      <Form >

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


                {userStatus === "FF" && <button
                  onClick={(e) => {
                    e.preventDefault();
                    postToWaitList(eventInfo._id);
                  }}
                  className="btn btn-primary"
                  style={{
                    marginTop: "60px",
                    marginLeft: "40px",
                    width: "80%",
                    boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  Join Event
                </button>}

                {userStatus === "TF" && <button
                  onClick={(e) => {
                    e.preventDefault();
                    Pop(eventInfo._id, adminEmail)
                  }}
                  // type="submit"
                  className="btn btn-warning"
                  style={{
                    marginTop: "60px",
                    marginLeft: "40px",
                    width: "80%",
                    boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  Remove from Wait-list
                </button>}

                {userStatus === "TT" && <button
                  onClick={(e) => {
                    e.preventDefault();
                    PopTwo(eventInfo._id, adminEmail)
                  }}

                  // type="submit"
                  className="btn btn-success"
                  style={{
                    marginTop: "60px",
                    marginLeft: "40px",
                    width: "80%",
                    boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  Remove from Approve-list
                </button>}


              </div>
            </div>
          </div>
        </div>




      </Form>

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

                {itineraryInfo.title && <div><p className="fw-medium d-inline">Itinerary for: <p className="lead d-inline">{itineraryInfo.title}</p></p></div>}

                {itineraryInfo.schedule && itineraryInfo.schedule.length > 0 ? (
                  itineraryInfo.schedule.map((item, index) => (
                    <div key={index}>
                      <hr className="border border-primary border-3 opacity-75" />
                      <div> <p className="fw-medium d-inline">Day: <p className="lead d-inline">{item.day} </p>  </p> </div>
                      <div> <p className="fw-medium d-inline">Details: <p className="lead d-inline">{item.activity}</p></p> </div>
                      <div> <p className="fw-medium  d-inline">Time: <p className="lead d-inline">{item.time} </p> </p> </div>
                    </div>
                  ))
                ) : (
                  <p>No information</p>
                )}


              </div>
              <div className="card card-body mt-5">

                {packingListInfo && <p className="display-6 fs-3">Recommended Items to bring</p>}
                {packingListInfo && packingListInfo.items && packingListInfo.items.length > 0 ? (

                  packingListInfo.items?.map((item, index) => (
                    <div key={index}>
                      <ul>
                        <li>
                          <p className="lead"> {item}</p>
                        </li>
                      </ul>

                    </div>
                  ))


                ) : (
                  <p> No information </p>
                )}
            </div>
          </div>

        </div>
      </div>
    </div >




    </>
  );
}
