"use client";
'use client'



import React, { useEffect, useState } from "react";
import styles from "./style.module.css"
import { GetList as GET } from "@/app/api/routes/evemtRoute";
import ListModalOne from "@/app/components/ListModalOne";
import ListModalTwo from "@/app/components/ListModalTwo";
import ListModalThree from "@/app/components/ListModalThree";
import { PostToAcceptanceList } from "@/app/api/routes/evemtRoute";
import { DeleteFromWaitList } from "@/app/api/routes/evemtRoute";
import { DeleteFromAcceptanceList } from "@/app/api/routes/evemtRoute";
import { useRouter } from "next/navigation";

export default function Page({params}) {

  const router = useRouter();

  const [waitList, setWaitList] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [eventID, setEventID] = useState("");


  const [active, setActive] = useState({ Active: false, id: -1, email: " " });
  const [active2, setActive2] = useState({ Active: false, id: -1, email: " " });
  const [active3, setActive3] = useState({ Active: false, id: -1, email: " " });



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
        console.log(data)
        setEventID(data.eventID)
        if (!AreArraysEqual(waitList, data.waitlist)) {
            console.log("1")
            setWaitList(data.waitlist);
          }
          if(!AreArraysEqualTwo(attendees, data.attendees)){
            console.log("2")
            setAttendees(data.attendees);
          }
    };
    fetchData();
  });


//  -------------------------------------------------------

function Pop(id,email) {
  setActive({ Active: true, id: id, email });
}

function ReverserPop(holdValue) {
  if (holdValue.onActive) {
    setActive({ Active: false, id: holdValue.holdId });
  } else {
    setActive({ Active: holdValue.onActive, id: holdValue.holdId });
  }

  if (holdValue.onActive) {
    console.log("shades")
    PostToAcceptanceList({ val: active.id, event: eventID, email: active.email, check: "accept" });
    alert("A notice of acceptance has been to repaint");
  }else{
    console.log("not being called ++++++++")
  }
}
// - - - - - - - - - - - - - - - - -
function PopTwo(id,email) {
  setActive2({ Active: true, id: id, email });
}

 function ReverserPopTwo(holdValue) {
  if (holdValue.onActive) {
    setActive2({ Active: false, id: holdValue.holdId });
  } else {
    setActive2({ Active: holdValue.onActive, id: holdValue.holdId });
  }

  if (holdValue.onActive) {
    console.log("shades")
   DeleteFromWaitList({ val: active2.id, event: eventID, email: active2.email, check: "removeW"});
     alert("Notice has been sent regarding removable from wait-list");
  }
}

//  -------------------------------------------------------
function PopThree(id,email) {
  setActive3({ Active: true, id: id,email });
}

function ReverserPopThree(holdValue) {
  if (holdValue.onActive) {
    setActive3({ Active: false, id: holdValue.holdId });
  } else {
    setActive3({ Active: holdValue.onActive, id: holdValue.holdId });
  }

  if (holdValue.onActive) {
    console.log("shades")
     DeleteFromAcceptanceList({ val: active3.id, event: eventID, email: active.email, check: "removeA" });
     alert("Notice has been sent regarding removable from acceptance-list");
  }
}
//  -------------------------------------------------------


    return (
      <>

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
              {/* <h2 style="text-align: center; margin-bottom: 40px;">Jacksonville, FL</h2> */}
              <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
                Jacksonville, FL
              </h2>
    
              {/* <div className="indicator"> */}
              <div className={styles.indicator}>
                <div>
                  <h3>Max: 20</h3>
                </div>
                <div>
                  <h3>Current: 11</h3>
                </div>
                <div>
                  <h3>Available: 9</h3>
                </div>
              </div>
            </div>

            <div className={`card ${styles.two}`}>
              {/* <h1 style="text-align: center;">Wait List </h1> */}
              <h1 style={{ textAlign: "center" }}>Wait List </h1>
    
              <div className={styles.test}>
              {waitList.map((list, index) => ( 

                 <div key={list._id} className={styles.box}>
                    <div className={styles.div1}>
                    <div className={styles.name}>
                        <p>Jean-Kerby Auguste</p>
                    </div>
                    <button onClick={(e) => {
                      router.push(`/Dashboard/EventHistory/${list._id}/list/${list._id}`);
                    }} 
                    className={`btn btn-info ${styles.a}`}>
                        More Info
                    </button>

                    </div>
                    <div className={styles.div2}>
                    <div>
                        <button onClick={(e) => Pop(list._id, list.email)} className={`btn btn-success ${styles.b}`}>Add</button>
                    </div>
                    <hr className={styles.line}></hr>
                    <div>
                    <button onClick={(e) => PopTwo(list._id, list.email)} className={`btn btn-danger ${styles.c}`}>Remove</button>
                    </div>
                    </div>
                    </div>

              ))}  
              </div>
            </div>
  
            <div className={`card ${styles.three}`}>
              {/* <h1 style="text-align: center;">Acceptance List</h1> */}
              <h1 style={{ textAlign: "center" }}>Acceptance List</h1>
              <div className={styles.test}>

              {attendees.map((list, index) => ( 

                    <div key={list._id} className={styles.box}>
                    <div className={styles.div1}>
                    <div className={styles.name}>
                        <p>Jean-Kerby Auguste</p>
                    </div>
                    <button onClick={(e) => {
                      router.push(`/Dashboard/EventHistory/${list._id}/list/${list._id}`);
                    }} 
                    className={`btn btn-info ${styles.a}`}>
                        More Info
                    </button>
                    </div>
                    <div className={styles.div2}>
                    {/* <div>
                        <button className={`btn btn-success ${styles.b}`}>
                        Accept
                        </button>
                    </div> */}
                    <div>
                    <hr className={styles.line}></hr>
                    <button onClick={(e) => PopThree(list._id, list.email)} className={`btn btn-danger ${styles.c}`}>Remove</button>
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
