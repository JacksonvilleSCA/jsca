"use client";
import { POST } from "../../../api/routes/evemtRoute";
import Edit from "../../../components/Edit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavThree from "@/app/components/Nav3";

export default function Home(props) {
  const [adminID, SetAdminID] = useState("");

  const router = useRouter();
  //Add possible loading check? -Sam
  useEffect(() => {
    var search = sessionStorage.getItem("AID");
    SetAdminID(search);
    if (search == null) {
      router.push("/login");
    }
  }, []);

  const [details, setDetails] = useState("");
  const [textarea, setTextarea] = useState("");

  return (
    <>
      <NavThree />
      <div
        className="container-sm "
        style={{ width: "60%", height: "100vh", marginBottom: "300px" }}
      >
        <h1 className="mb-4 text-center mt-3">Create Event</h1>
        <form action={POST}>
          <div className="mb-1">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              name="totalPeople"
              min="1"
              max="10000"
              style={{ width: "10%" }}
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              name="avatar"
              accept="image/png, image/jpeg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Event Type</label>
            <select className="form-select" name="event">
              <option value="Standard">Local Event</option>
              <option value="Exchange">Exchange Program</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Start Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="startTime"
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="form-label">End Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="endTime"
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
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="form-label ">Details</label>
            <Edit valueOfTextarea={textarea} details={setDetails} />
            <input type="hidden" value={details} name="details" />
          </div>

          <div className="d-grid vstack gap-2">
            <button type="submit" className="btn btn-primary mb-4">
              Submit
            </button>
          </div>
          <input type="hidden" value={adminID} name="adminID" />
        </form>
      </div>
    </>
  );
}
