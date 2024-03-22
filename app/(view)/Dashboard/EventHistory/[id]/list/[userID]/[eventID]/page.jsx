"use client"

import { useEffect,useState } from "react"
import { GetMoreInfoEvent } from "@/app/api/routes/evemtRoute";
import Edit from "@/app/components/Edit";
import NavThree from "@/app/components/Nav3";

export default function Page(params) {
    console.log(params.params.id)

    const [eventInfo, setEventInfo] = useState("");
    const [details, setDetails] = useState("");


        useEffect(() => {
        const fetchData = async () => {
          const data = await GetMoreInfoEvent(params.params.id);
          console.log(data)
         setEventInfo(data);
        };
        fetchData();
      }, [params]);

      return (
        <>
        <NavThree/>
          <div
            key={eventInfo._id}
            className="container-sm "
            style={{ width: "60%", height: "100vh", marginBottom: "300px" }}
          >
            <h1 className="mb-4 text-center mt-3">Event Info</h1>
            <div key={eventInfo._id} >
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="totalPeople"
                  min="1"
                  max="10000"
                  style={{ width: "10%" }}
                  defaultValue={eventInfo.amount}
                  required
                  readOnly
                ></input>
              </div>
    
              <div className="mb-4">
                <div className="card mb-3" style={{ maxWidth: "600px" }}>
                  <div className="row g-0">
                          <img
                          alt="Picture of the Event"
                          src={eventInfo.img}
                          width={100}
                          height={300}
                          style={{
                            width: "100%",
                          }}
                        />
                  </div>
                </div>
              </div>
    
              <div className="mb-4">
                <label className="form-label">Start Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startTime"
                  defaultValue={eventInfo.startTime}
                  required
                  readOnly
                ></input>
              </div>
    
              <div className="mb-4">
                <label className="form-label">End Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="endTime"
                  defaultValue={eventInfo.endTime}
                  required
                  readOnly
                ></input>
              </div>
    
              <div className="mb-4">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="Location"
                  placeholder="Enter the location"
                  defaultValue={eventInfo.location}
                  required
                  readOnly
                ></input>
              </div>
        
              <div className="mb-4">
                <label className="form-label ">Details</label>
                <Edit currentDetails={eventInfo.details} details={setDetails} />
                <input type="hidden" value={details} name="details" />
              </div>
    

              <div className="d-grid vstack gap-2">
                <button  className="btn btn-primary mb-4">
                  Update
                </button>
              </div>
            </div>
          </div>
        </>
      );

}