"use client";

import { useEffect, useState } from "react";
import { getEvent as GET } from "../../../../../api/routes/evemtRoute";
import { DELETE as DeleteEvent } from "../../../../../api/routes/evemtRoute";
import Image from "next/image";
import ConfirmDelete from "@/app/components/ConfirmDeletion";
import TextContent from "@/app/components/Text";
import { redirect, useRouter } from "next/navigation";
import ItineraryModal from "@/app/components/ItineraryModal";
import NavThree from "@/app/components/Nav3";

export default function Page({ params }) {
  const router = useRouter();

  var search = sessionStorage.getItem("AID");
  if (search == null) {
    router.push("/login");
  }

  const [active, setActive] = useState({ Active: false, id: -1 });
  const [active2, setActive2] = useState({ Active: false, id: -1 });
  const [eventInfo, setEventInfo] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [currentPeople, setCurrentPeople] = useState("");
  const [availableSpace, setAvailableSpace] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await GET(params);
      setMaxPeople(data.props.data.amount);

      if (data.props.data.attendees.length === 0) {
        setCurrentPeople(0);
      } else {
        setCurrentPeople(data.props.data.attendees.length);
      }

      const formattedData = {
        ...data.props.data,
        startTime: formatTime(data.props.data.startTime),
        endTime: formatTime(data.props.data.endTime),
      };

      setAvailableSpace(maxPeople - currentPeople);
      setEventInfo(formattedData);
    };

    fetchData();
  }, [maxPeople, params]);

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

  function Itinerary(id) {
    setActive2({ Active: true, id: id });
  }

  function ItineraryReverse(holdValue) {
    if (holdValue.onActive) {
      setActive2({ Active: false, id: holdValue.holdId });
    } else {
      setActive2({ Active: holdValue.onActive, id: holdValue.holdId });
    }

    if (holdValue.onActive) {
      if (holdValue.location === "Packaging") {
        console.log("Packaging");
        router.push(`/createPackingList?eventId=${eventInfo._id}`);
      } else if (holdValue.location === "Itinerary") {
        console.log("Itinerary");
        router.push(`/ItineraryCreate?eventId=${eventInfo._id}`);
      } else if (holdValue.location === "Planning") {
        console.log("Planning");
        router.push(`/listMenu?eventId=${eventInfo._id}`);
      }
    }
  }

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
      {active2.Active && (
        <ItineraryModal
          value={active2.Active}
          value2={active2.id}
          reverse={ItineraryReverse}
        />
      )}

      {active.Active && (
        <ConfirmDelete
          value={active.Active}
          value2={active.id}
          reverse={ReverserPop}
        />
      )}
      <div
        key={eventInfo._id}
        className="container "
        style={{
          marginTop: "5%",
          marginBottom: "10%",
          width: "80%",
          height: "40%",
        }}
      >
        <div
          key={eventInfo._id}
          className="card"
          style={{ boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)" }}
        >
          <div className="card-header">
            <div style={{ textAlign: "center" }}>
              <span style={{ marginRight: "20px" }}>Max: {maxPeople}</span>
              <span style={{ marginRight: "20px" }}>
                Current : {currentPeople}
              </span>
              <span style={{ marginRight: "20px" }}>
                Available: {availableSpace}
              </span>
            </div>
          </div>

          <div>
            <div>
              <img
                alt="Picture of the Event"
                src={eventInfo.img}
                style={{
                  width: "100%",
                  height: "550px",
                }}
              />
            </div>

            <div className="card-body" style={{ width: "100%" }}>
              <div>
                <h2>{eventInfo.location}</h2>
                <hr />
                <h3>Event Duration</h3>
                 
                <h4>
                  {eventInfo.startTime} -  {eventInfo.endTime}
                </h4>
                <hr />
                <div className="card-text">
                  <div
                    dangerouslySetInnerHTML={{ __html: eventInfo.details }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div>
              <button
                style={{marginLeft: "20px", marginRight: "30px", marginTop: "10px" }}
                onClick={(e) => Itinerary(eventInfo._id)}
                className="btn btn-primary px-5"
              >
                Itinerary/Packing list
              </button>

              <button
                style={{ marginRight: "30px", marginTop: "10px" }}
                onClick={(e) => {
                  router.push(`/Dashboard/EventHistory/${eventInfo._id}/list`);
                }}
                className="btn btn-info px-5"
              >
                Wait List
              </button>

              <button
                style={{ marginRight: "30px", marginTop: "10px" }}
                onClick={(e) => {
                  router.push(
                    `/Dashboard/EventHistory/${eventInfo._id}/temp/${eventInfo._id}`
                  );
                }}
                className="btn btn-warning px-5"
              >
                Event Info
              </button>

              <button
                style={{ marginRight: "30px", marginTop: "10px" }}
                onClick={(e) => {
                  router.push(`/adminStaticViewForm?id=${eventInfo._id}`);
                }}
                className="btn btn-secondary px-5"
              >
                Forms
              </button>

              <button
                style={{marginRight: "30px", marginTop: "10px" }}
                onClick={(e) => {
                  router.push(`/Dashboard/EventHistory/${eventInfo._id}`);
                }}
                className="btn btn-success px-5"
              >
                Update
              </button>

              <button
                style={{ marginRight: "30px", marginTop: "10px" }}
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
