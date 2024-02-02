"use client";
import React, { useEffect } from "react";
import { getEvent as GET } from "@/app/api/routes/evemtRoute";
import { PUT } from "@/app/api/routes/evemtRoute";
import { useState } from "react";
import Edit from "@/app/components/Edit";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page({ params }) {
  const [details, setDetails] = useState("");
  const [eventInfo, setEventInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await GET(params);
      setEventInfo(data);
    };
    fetchData();
  }, [params]);

  return (
    <>
      <div
        key={eventInfo._id}
        className="container-sm "
        style={{ width: "60%", height: "100vh", marginBottom: "300px" }}
      >
        <h1 className="mb-4 text-center mt-3">Update Event</h1>
        <form key={eventInfo._id} action={PUT}>
          <div className="mb-3">
            <label className="form-label">Amount</label>
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
              defaultValue={eventInfo.amount}
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="form-label">Activation</label>
            <div>
              <select
                name="activation"
                className="form-select"
                style={{ width: "30%" }}
              >
                {eventInfo.active && (
                  <>
                    <option value="Activate">Activate</option>
                    <option value="Deactivate">Deactivate</option>
                  </>
                )}
                {eventInfo.active === false && (
                  <>
                    <option value="Deactivate">Deactivate</option>
                    <option value="Activate">Activate</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <div className="card mb-3" style={{ maxWidth: "800px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  {/* {
                      eventInfo.img &&  
                      <Image
                        alt="Picture of the Event"
                        src={eventInfo.img}
                        width={100}
                        height={300}
                        style={{
                          width: "100%",
                        }}
                      />
                    } */}

                      <Image
                      alt="Picture of the Event"
                      src={eventInfo.img}
                      width={100}
                      height={300}
                      style={{
                        width: "100%",
                      }}
                    />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ textAlign: "center", marginBottom: "60px" }}
                    >
                      Update Image 
                    </h5>
                    <input
                      type="file"
                      className="form-control"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      // onChange={(e) => setImage(e.target.files?.[0])}
                    />
                    <input type="hidden" name="avatarTwo" value={eventInfo.img} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Start Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="startTime"
              // onChange={(e) => {
              //   setStartTime(e.target.value);
              // }}
              // value={startTime}
              defaultValue={eventInfo.startTime}
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="form-label">End Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="endTime"
              // onChange={(e) => {
              //   setEndTime(e.target.value);
              // }}
              // value={endTime}
              defaultValue={eventInfo.endTime}
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="Location"
              placeholder="Enter the location"
              // onChange={(e) => {
              //   setLocation(e.target.value);
              // }}
              // value={location}
              defaultValue={eventInfo.location}
              required
            ></input>
          </div>

          {/* <div>
        <label  className="form-label ">
            Details
        </label>
        <div>
            <textarea style={{width: "100%"}} name="details" id="" cols="" rows="10"  onChange={(e) => {
              setDetails(e.target.value);
            }}
            defaultValue={eventInfo.details}
             >
            </textarea>
        </div>
        </div> */}

          <div className="mb-4">
            <label className="form-label ">Details</label>
            <Edit currentDetails={eventInfo.details} details={setDetails} />
            <input type="hidden" value={details} name="details" />
          </div>

          <input type="hidden" name="event" defaultValue={eventInfo._id} />

          <div className="d-grid vstack gap-2">
            <button type="submit" className="btn btn-primary mb-4">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
