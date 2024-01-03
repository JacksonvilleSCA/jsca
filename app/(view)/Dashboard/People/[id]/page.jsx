"use client"

import React, { useEffect,useState } from 'react'
import { getEvent as GET} from '@/app/api/routes/evemtRoute'

export default function Page({params}){
  
  const [eventInfo, setEventInfo] = useState("");

  
  useEffect(() => {
    const fetchData = async () =>{
        const data  = await GET(params);
          setEventInfo(data);
      }
      fetchData();
  }, []);


  return (
    <>
    <div   className="container mt-5">
      <div  className="card" style={{width: '100%', boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)"}}>
        <div className="card-title text-center mt-3 mb-3">
        {eventInfo.location} 
        </div>

        <div className='d-flex'>
        <img
          src="https://picsum.photos/200"
          className="card-img-top"
          alt="image"
          width={"100%"}
          />


        <div className="card-body" style={{width: "100%"}}>
          <div>
            <h3> Time & Location </h3>
            <hr />
            <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel ipsa delectus reiciendis natus laborum ducimus similique ratione dicta ullam.
            </p>
          </div>
          <div style={{marginTop: "10%"}}>
            <h3>About the Event</h3>
            <hr />
            <p className="card-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi quas aperiam, perspiciatis dolorem illum possimus voluptate voluptatem culpa vitae quam!
            </p>
          </div>

          <button type="button" class="btn btn-success" style={{marginTop: "70px",marginLeft: "100px",width: "60%", boxShadow: "14px 14px 15px 0px rgba(0,0,0,0.1)"}}>Join</button>
        </div>

         

        </div>
      </div>
 </div>
 
 </>
  )
}