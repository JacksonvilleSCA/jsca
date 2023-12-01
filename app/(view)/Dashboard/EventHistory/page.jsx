"use client"

import { useEffect, useState } from "react";
import {GET as getEvent} from "../../../api/routes/evemtRoute"
export default function Page(){

  const [eventInfomration, setEventInformation] = useState([]);

  let temholder = [];

    // Utility function to check if two arrays are equal
    const areArraysEqual = (array1, array2) => {
      return JSON.stringify(array1) === JSON.stringify(array2);
    };

  useEffect(() => {

    const fetchData = async () =>{
      const data  = await getEvent();
      // temholder = data;
      
      if (!areArraysEqual(eventInfomration, data)) {
        setEventInformation(data);
      }
      
    }
    fetchData();

  },[]);

  return (
    <>
      <div className="container mt-5">
              {eventInfomration.map((event, index) => (
               <div key={event._id} className="card" style={{ width: "90%" }}>
               <div className="d-flex">
                 <img
                   src={event.img}
                   className="card-img-top"
                   alt="image"
                 />
                 <div className="card-body">
                   <div>
                     <h3> {event.startTime} </h3>
                     <hr />
                     <p className="card-text">
                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                     </p>
                     <p className="card-text">
                       Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     </p>
                   </div>
                   <div>
                     <h3>About the Event</h3>
                     <hr />
                     <p className="card-text">
                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                       Minus quas nulla reprehenderit adipisci autem pariatur
                       voluptatum eligendi veritatis numquam facilis.
                     </p>
                   </div>
                 </div>
               </div>
               <div className="card-footer">
                 <div className="d-flex justify-content-evenly">
                   <button className="btn btn-primary px-5">Active</button>
                   <button className="btn btn-success px-5">Update</button>
                   <button className="btn btn-danger px-5">Delete</button>
                 </div>
               </div>
             </div>
            ))}
          
{/* 
        <div className="card" style={{ width: "90%" }}>
          <div className="d-flex">
            <img
              src="https://picsum.photos/200"
              className="card-img-top"
              alt="image"
            />
            <div className="card-body">
              <div>
                <h3> Time & Location </h3>
                <hr />
                <p className="card-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div>
                <h3>About the Event</h3>
                <hr />
                <p className="card-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Minus quas nulla reprehenderit adipisci autem pariatur
                  voluptatum eligendi veritatis numquam facilis.
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-evenly">
              <button className="btn btn-primary px-5">Active</button>
              <button className="btn btn-success px-5">Update</button>
              <button className="btn btn-danger px-5">Delete</button>
            </div>
          </div>
        </div> */}




      </div>
    </>
  );
};


      // async function myAction() {
      //     const data  = await getEvent()

      //     // data.forEach((item,index) => {

      //     //   const file = item.img;
      //     //   // console.log(file);

      //     //  let temp2 = <img src={URL.createObjectURL(file)} alt="Image" />;
      //     //  let temp1 = URL.createObjectURL(file);

            
      //     //  data[index].img = temp1;
      //     // })

      //     console.log("In the server");
      //     console.log(data);
      // }

      // myAction()

