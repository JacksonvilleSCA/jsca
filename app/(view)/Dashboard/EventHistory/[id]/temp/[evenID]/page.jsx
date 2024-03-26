"use client";
import React, { useEffect, useState, useRef } from "react";
import { GetMoreInfoEvent } from "@/app/api/routes/evemtRoute";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Page({ params }) {
  const [eventInfo, setEventInfo] = useState("");
  const [details, setDetails] = useState("");
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetMoreInfoEvent(params.evenID);
      setEventInfo(data);
      if (typeof data.details === "string") {
        const strippedDetails = data.details.replace(/<\/?p>/g, "");
        setDetails(strippedDetails);
      }
    };
    fetchData();
  }, [params]);

  function printScreen() {
    const confirm = window.confirm("Confirm to download document.");
    if (confirm) {
      console.log("Downloading...");
      try {
        const element = printRef.current;
        html2canvas(element, { height: element.scrollHeight }).then(
          (canvas) => {
            const data = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("AccountInfo.pdf");
          }
        );
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <>
      <div ref={printRef}>
        <div
          key={eventInfo._id}
          className="container-sm"
          style={{ width: "60%", marginBottom: "300px", marginTop: "90px" }}
        >
          <h1 className="mb-4 text-center mt-3">Event Info</h1>
          <div className="mb-3">
            <label className="form-label">Max attendees</label>
            <input
              type="number"
              className="form-control"
              name="totalPeople"
              min="1"
              max="10000"
              style={{ width: "20%" }}
              defaultValue={eventInfo.amount}
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Max attendees</label>

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
            />
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
            />
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
            />
          </div>
          <div className="mb-4">
            <label className="form-label ">Details</label>
            <hr />
            {details}
            <hr />
          </div>

          <div className="d-grid vstack gap-2">
            <button onClick={printScreen} className="btn btn-secondary mb-4">
              Export to PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
