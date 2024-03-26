"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { GetList as GET } from "@/app/api/routes/evemtRoute";
import ListModalOne from "@/app/components/ListModalOne";
import ListModalTwo from "@/app/components/ListModalTwo";
import ListModalThree from "@/app/components/ListModalThree";
import { PostToAcceptanceList } from "@/app/api/routes/evemtRoute";
import { DeleteFromWaitList } from "@/app/api/routes/evemtRoute";
import { DeleteFromAcceptanceList } from "@/app/api/routes/evemtRoute";
import { useRouter } from "next/navigation";
import NavThree from "@/app/components/Nav3";

export default function Page({ params }) {
  const router = useRouter();

  const [waitList, setWaitList] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [eventID, setEventID] = useState("");

  const [active, setActive] = useState({ Active: false, id: -1, email: " " });
  const [active2, setActive2] = useState({ Active: false, id: -1, email: " " });
  const [active3, setActive3] = useState({ Active: false, id: -1, email: " " });

  const [maxPeople, setMaxPeople] = useState("");
  const [currentPeople, setCurrentPeople] = useState("");
  const [availableSpace, setAvailableSpace] = useState("");

  // Utility function to check if two arrays are equal
  const AreArraysEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  const AreArraysEqualTwo = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await GET(params);
      setEventID(data.eventID);

      setMaxPeople(data.max);

      if (data.attendees.length === 0) {
        setCurrentPeople(0);
      } else {
        setCurrentPeople(data.attendees.length);
      }
      setAvailableSpace(maxPeople - currentPeople);

      if (!AreArraysEqual(waitList, data.waitlist)) {
        setWaitList(data.waitlist);
      }
      if (!AreArraysEqualTwo(attendees, data.attendees)) {
        setAttendees(data.attendees);
      }
    };
    fetchData();
  });

  //  -------------------------------------------------------

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
      PostToAcceptanceList({
        val: active.id,
        event: eventID,
        email: active.email,
        check: "accept",
      });
      alert("A notice of acceptance has been to repaint");
    } else {
    }
  }
  // - - - - - - - - - - - - - - - - -
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
      DeleteFromWaitList({
        val: active2.id,
        event: eventID,
        email: active2.email,
        check: "removeW",
      });
      alert("Notice has been sent regarding removable from wait-list");
    }
  }

  //  -------------------------------------------------------
  function PopThree(id, email) {
    setActive3({ Active: true, id: id, email });
  }

  function ReverserPopThree(holdValue) {
    if (holdValue.onActive) {
      setActive3({ Active: false, id: holdValue.holdId });
    } else {
      setActive3({ Active: holdValue.onActive, id: holdValue.holdId });
    }

    if (holdValue.onActive) {
      DeleteFromAcceptanceList({
        val: active3.id,
        event: eventID,
        email: active.email,
        check: "removeA",
      });
      alert("Notice has been sent regarding removable from acceptance-list");
    }
  }
  //  -------------------------------------------------------

  return (
    <>
      <NavThree />
      {active3.Active && (
        <ListModalThree
          value={active3.Active}
          value2={active3.id}
          reverse={ReverserPopThree}
        />
      )}

      {active2.Active && (
        <ListModalTwo
          value={active2.Active}
          value2={active2.id}
          reverse={ReverserPopTwo}
        />
      )}

      {active.Active && (
        <ListModalOne
          value={active.Active}
          value2={active.id}
          reverse={ReverserPop}
        />
      )}

      <div>
        <div className={styles.wrapper}>
          <div className={`card ${styles.one}`}>
            <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
              Jacksonville, FL
            </h2>
            <div className={styles.indicator}>
              <div>
                <h3>Max: {maxPeople}</h3>
              </div>
              <div>
                <h3>Current: {currentPeople}</h3>
              </div>
              <div>
                <h3>Available: {availableSpace}</h3>
              </div>
            </div>
          </div>

          <div className={`card ${styles.two}`}>
            <h1 style={{ textAlign: "center" }}>Wait List </h1>

            <div className={styles.test}>
              {waitList.map((list, index) => (
                <div key={list._id} className={styles.box}>
                  <div className={styles.div1}>
                    <div className={styles.name}>
                      <p>{list.firstname} {list.lastname}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        router.push(
                          `/Dashboard/EventHistory/${list._id}/list/${list._id}`
                        );
                      }}
                      className={`btn btn-info ${styles.a}`}
                    >
                      More Info
                    </button>
                  </div>
                  <div className={styles.div2}>
                    <div>
                      <button
                        onClick={(e) => Pop(list._id, list.email)}
                        className={`btn btn-success ${styles.b}`}
                      >
                        Add
                      </button>
                    </div>
                    <hr className={styles.line}></hr>
                    <div>
                      <button
                        onClick={(e) => PopTwo(list._id, list.email)}
                        className={`btn btn-danger ${styles.c}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`card ${styles.three}`}>
            <h1 style={{ textAlign: "center" }}>Acceptance List</h1>
            <div className={styles.test}>
              {attendees.map((list, index) => (
                <div key={list._id} className={styles.box}>
                  <div className={styles.div1}>
                    <div className={styles.name}>
                      <p>Jean-Kerby Auguste</p>
                    </div>
                    <button
                      onClick={(e) => {
                        router.push(
                          `/Dashboard/EventHistory/${list._id}/list/${list._id}`
                        );
                      }}
                      className={`btn btn-info ${styles.a}`}
                    >
                      More Info
                    </button>
                  </div>
                  <div className={styles.div2}>
                    <div>
                      <hr className={styles.line}></hr>
                      <button
                        onClick={(e) => PopThree(list._id, list.email)}
                        className={`btn btn-danger ${styles.c}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
