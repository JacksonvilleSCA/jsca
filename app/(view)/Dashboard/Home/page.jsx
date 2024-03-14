"use client";
import {POST} from "../../../api/routes/evemtRoute"
import Edit from "../../../components/Edit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavThree from "@/app/components/Nav3";

export default function Home(props) {

   const [adminID, SetAdminID] = useState("");

  const router = useRouter();
  //Add possible loading check? -Sam
  useEffect(() => {
    var search = sessionStorage.getItem('AID');
    SetAdminID(search);
    if(search == null){
    router.push('/login');
    }
  },[]);

    const [amount, setAmount] = useState("");
    const [image, setImage] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [details, setDetails] = useState("");
    const [textarea, setTextarea] = useState("");


    // encType="multipart/form-data"
  

    //  async function test(){

    //   console.log("hello");
    //   console.log(typeof image);
    //    console.log(image)
    //   const bytes = await image.arrayBuffer();
    //    console.log(typeof bytes)
    //   console.log(bytes)
    //   const buffer = Buffer.from(bytes);
    //   console.log(typeof buffer);
    //   console.log(buffer)
    //   // POST() 
    //   }

    return (
      <>
      <NavThree/>
        <div
          className="container-sm "
          style={{ width: "60%", height: "100vh", marginBottom: "300px" }}
        >
          <h1 className="mb-4 text-center mt-3">Create Event</h1>
          <form action={POST}>
          {/* <form action={eventCreation}> */}
            <div className="mb-1">
              <label className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                name="totalPeople"
                min="1"
                max="10000"
                style={{ width: "10%" }}
                // onChange={(e) => {
                //   setAmount(e.target.value);
                // }}
                // value={amount}
                required
              ></input>
            </div>
  
            <div className="mb-4">
              <label className="form-label"></label>
              <input
                type="file"
                className="form-control"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => setImage(e.target.files?.[0])}
                required
              />
            </div>
      
              

            <div className="mb-4">
              <label  className="form-label">
                Start Time
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="startTime"
                // onChange={(e) => {
                //   setStartTime(e.target.value);
                // }}
                // value={startTime}
                required
              ></input>
            </div>
  
            <div className="mb-4">
              <label className="form-label">
                End Time
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="endTime"
                // onChange={(e) => {
                //   setEndTime(e.target.value);
                // }}
                // value={endTime}
                required
              ></input>
            </div>
  
            <div className="mb-4">
              <label  className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                name="Location"
                placeholder="Enter the location"
                // onChange={(e) => {
                //   setLocation(e.target.value);
                // }}
                // value={location}
                required
              ></input>
            </div>

             {/* <div>
            <label className="form-label ">
                Details
            </label>
            <div>
                <textarea style={{width: "100%"}} name="details" id="" cols="" rows="10"  onChange={(e) => {
                  setDetails(e.target.value);
                }}
                value={details}
                 >
                </textarea>
            </div>
            </div>  */}
  
            <div className="mb-4">
              <label  className="form-label ">
                Details
              </label>
              <Edit valueOfTextarea={textarea} details={setDetails} />
              <input type="hidden" value={details}  name="details" />
            </div>
  
            <div className="d-grid vstack gap-2">
              <button type="submit" className="btn btn-primary mb-4">
                Submit
              </button>
            {/* <button type="button" onClick={test}>Submit</button> */}
            </div>
            <input type="hidden" value={adminID}  name="adminID" />
          </form>
        </div>
      </>
    );
  }
  