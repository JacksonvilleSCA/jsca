"use client"


import { useEffect,useState } from "react"
import styles from "./style.module.css"
import { useRouter } from "next/navigation"
import { GetMemberEvents } from "@/app/api/routes/evemtRoute"

export default function Page(params) {

    const router = useRouter();

    console.log(params)
    const [memberInfo, setMemberInfo] = useState("");
    const [eventArray, setEventArray] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          const data = await GetMemberEvents(params.params);
          console.log(data)
        setMemberInfo(data.memberInfo);
        setEventArray(data.eventInfo)
        };
        fetchData();
      }, [params]);

    return (

        <div>
    
        <div className={styles.container}>
        <div className={`card ${styles.one}`}>

        <h3 style={{ textAlign: "center" }}>Info</h3>

        <div style={{marginLeft: "30px"}}>

          <div className="mb-3">
          <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "50%", marginLeft: "" }}
              defaultValue={memberInfo.email}
              required
              readOnly
            ></input>
            </div>


          <div className="mb-3">
          <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "50%" }}
              defaultValue={memberInfo.firstname}
              required
              readOnly
            ></input>
            </div>


          <div className="mb-3">
          <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "50%" }}
              defaultValue={memberInfo.lastname}
              required
              readOnly
            ></input>
            </div>


          <div className="mb-3">
          <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "50%" }}
              defaultValue={memberInfo.phonenumber}
              required
              readOnly
            ></input>
            </div>

         <div className="mb-3">
          <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "50%" }}
              defaultValue={memberInfo.country}
              required
              readOnly
            ></input>
            </div>


          <div className="mb-3">
          <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "20%" }}
              defaultValue={memberInfo.state}
              required
              readOnly
            ></input>
            </div>

          <div className="mb-3">
          <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "50%" }}
              defaultValue={memberInfo.city}
              required
              readOnly
            ></input>
            </div>



          <div className="mb-3">
          <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              name="totalPeople"
              style={{ width: "50%" }}
              defaultValue={memberInfo.street}
              required
              readOnly
            ></input>
            </div>

            </div>

        </div>
  
        <div>
          <button className={`btn btn-primary`} style={{ width: "85%", marginLeft: "30px"}}>Go Back</button>
        </div>
  
        <div className={`card ${styles.two}`}>
          <h3 style={{ textAlign: "center" }}>Events</h3>
  
          <div className={styles.test}>
            
          {eventArray.map((list, index) => ( 
            <div key={list._id} className={styles.box}>
              <div className={styles.div1}>
                <div className={styles.name}>
                  <p>{list.location}</p>
                </div>
                <button onClick={(e)=> {
                      router.push(`/Dashboard/EventHistory/${list._id}/list/${list._id}/${list._id}`);
                }}
                className={`btn btn-info ${styles.a}"`}>More Info</button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>

      </div>
    )

}