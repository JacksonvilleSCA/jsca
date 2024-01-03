"use client";

import { useEffect, useState } from "react";
import { getEvent as GET } from "../../../../../api/routes/evemtRoute";
import { DELETE as DeleteEvent } from "../../../../../api/routes/evemtRoute";

import ConfirmDelete from "@/app/components/ConfirmDeletion";
import TextContent from "@/app/components/Text";
import { redirect, useRouter } from "next/navigation";

export default function Page({params}) {

  const router = useRouter();

  const [active, setActive] = useState({ Active: false, id: -1 });
  const [eventInfo, setEventInfo] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [currentPeople, setCurrentPeople] = useState("");
  const [availableSpace, setAvailableSpace] = useState("");



  useEffect(() => {
    const fetchData = async () =>{
        const data  = await GET(params);
        setMaxPeople(data.amount);

          if(data.attendees.length === 0){
            setCurrentPeople(data.attendees.length)
          }else{
            setCurrentPeople(0);
          }

          setAvailableSpace(maxPeople - data.attendees.length)

        setEventInfo(data);
      }
      fetchData();
  }, []);

  function Pop(id) {
    setActive({ Active: true, id: id });
  }

  function ReverserPop(holdValue) {
    if (holdValue.onActive) {
      setActive({ Active: false, id: holdValue.holdId });
    } else {
      setActive({ Active: holdValue.onActive, id: holdValue.holdId });
    }

    if (holdValue.onActive) {
      DeleteEvent({ val: active.id });
    }
  }



 

  

  return (
    <>
      {active.Active && (
        <ConfirmDelete
          value={active.Active}
          value2={active.id}
          reverse={ReverserPop}
        />
      )}
      <div key={eventInfo._id} className="container " style={{ marginTop: "5%", marginBottom: "10%", width: "80%", height: "40%"}}>

          <div key={eventInfo._id} className="card" style={{boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)"}}>
            <div className="card-header">
                <div style={{textAlign: "center"}}>
                <span style={{marginRight: "20px"}}>
                Max: {maxPeople}
              </span>
              <span style={{marginRight: "20px"}}>
                Current : {currentPeople}
              </span>
              <span style={{marginRight: "20px"}}>
              Available: {availableSpace}
              </span>
                </div>


            </div>
            <div className="d-flex">
              {/* <img src={eventInfo.img} className="card-img-top" alt="image" /> */}
              <img
                  src="https://picsum.photos/200"
                  className="card-img-top"
                  alt="image"
                  width={"100%"}
                />
              <div className="card-body" style={{width: "100%"}}>
                {/* <div>
                  <h3> {eventInfo.startTime} </h3>
                  <hr />
                  <p className="card-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </p>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div> */}
                <div  >
                  <h3>{eventInfo.location}, {eventInfo.startTime}</h3>
                  <hr />
                  <p className="card-text">
                        {eventInfo.details}
                  </p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-primary px-5">Active</button>
                <button
                  onClick={(e) => {
                    router.push(`/Dashboard/EventHistory/${eventInfo._id}`);
                  }}
                  className="btn btn-success px-5"
                >
                  Update
                </button>
                <button
                  onClick={(e) => Pop(eventInfo._id)}
                  className="btn btn-danger px-5"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

            

      </div>
    </>
  );
}

