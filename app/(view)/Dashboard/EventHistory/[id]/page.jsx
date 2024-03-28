"use client";
import React, { useEffect } from "react";
import { getEvent as GET } from "@/app/api/routes/evemtRoute";
import { PUT } from "@/app/api/routes/evemtRoute";
import { useState } from "react";
import Edit from "@/app/components/Edit";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavThree from "@/app/components/Nav3";

export default function Page({ params }) {
  console.log(params);

  const router = useRouter();

  const [details, setDetails] = useState("");
  const [eventInfo, setEventInfo] = useState("");

  useEffect(() => {
    var search = sessionStorage.getItem("AID");
    if (search == null) {
      router.push("/login");
    }
    const fetchData = async () => {
      const data = await GET(params);
      setEventInfo(data.props.data);
      setDetails(data.props.data.details);
    };
    fetchData();
  }, [params]);

  return (
    <>
      <NavThree />
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
            <label className="form-label">Event Type</label>



            <select
                name="eventType"
                className="form-select"
                style={{ width: "30%" }}
              >
                {eventInfo.event === "Standard" && (
                  <>
                 <option value="Standard">Local Event</option>
                 <option value="Exchange">Exchange Program</option>
                  </>
                )}
                {eventInfo.event === "Exchange" && (
                  <>
                  <option value="Exchange">Exchange Program</option>
                   <option value="Standard">Local Event</option>
                  </>
                )}
              </select>



          </div>

          <div className="mb-4">
            <div className="card mb-3" style={{ maxWidth: "800px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  {
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
                    }

                  {/* <Image
                    alt="Picture of the Event"
                    src={eventInfo.img}
                    width={100}
                    height={300}
                    style={{
                      width: "100%",
                    }}
                  /> */}
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
                    />
                    <input
                      type="hidden"
                      name="avatarTwo"
                      value={eventInfo.img}
                    />
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
              defaultValue={eventInfo.location}
              required
            ></input>
          </div>
          <div className="mb-4">
            <label className="form-label ">Details</label>
            <Edit currentDetails={eventInfo.details} details={setDetails} />
            <input type="hidden" value={details} name="details" />
          </div>

          <input type="hidden" name="event" defaultValue={eventInfo._id} />

          <div className="d-grid vstack gap-2">
            <button type="submit" className="btn btn-primary mb-4">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
