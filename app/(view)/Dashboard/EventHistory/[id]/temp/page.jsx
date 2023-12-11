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

  useEffect(() => {
    const fetchData = async () =>{
        const data  = await GET(params);
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
      <div key={eventInfo._id} className="container " style={{ marginTop: "5%"}}>

          <div key={eventInfo._id} className="card" style={{boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)"}}>
            <div className="d-flex">
              {/* <img src={eventInfo.img} className="card-img-top" alt="image" /> */}
              <img
                  src="https://picsum.photos/200"
                  className="card-img-top"
                  alt="image"
                  width={"10%"}
                  height={"700px"}
                />
              <div className="card-body">
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

