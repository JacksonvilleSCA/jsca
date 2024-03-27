"use client"
import React from 'react';
import { POST } from '@/app/api/routes/essayroutes';
import { PostToEvent } from '@/app/api/routes/essayroutes';
import {useEffect } from "react"; 
import {useRouter} from 'next/navigation';
import { useState } from 'react';
import NavTwo from "@/app/components/Nav2"


 const StudentForm = ({params}) => {
    console.log(params)
    const router = useRouter();
    const [essay, setEssay] = useState('');
    const [eventID, setEventID] = useState(params.eventID);
    const [currentID, setCurrentID] = useState(params.eventID);

    console.log(eventID)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData(e.target);
        const submittedEssay = sessionStorage.getItem('essay'); //gets submitted essay 
        if(!submittedEssay) {
            alert("Please fill out the essay before submitting the form.")
            return; 
        }
        const formData = new FormData(e.target);
        formData.append("essay", submittedEssay); //apend submitted essay to form
        try {
            await POST(formData);
            console.log("form submitted!"); 
            
            setTimeout(() => {
                
                router.push('/studentViewForm'); 
                
            }, 2000); 
            sessionStorage.removeItem('essay'); 
            
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }
    useEffect(() => {
        const uid = sessionStorage.getItem('uid');
        setCurrentID(uid);
        if (!uid) {
            router.push('/login');
        }
    }, []);

    

     return (
         <>
             <div>
                 <NavTwo/>
                 <div className="page-container">
                     <h2 style={{ textAlign: 'center' }}>
                         Jacksonville Sister Cities  Landon Middle Student Exchange Program Application Form</h2>
                     <div className=" container">
                         <div className="row justify-content-center">
                             <div className="col-md-12">
                                 <div className="card bg-light" style={{ border: '6.5px solid #007bff' }}>
                                     <h4 style={{ textAlign: 'center' }}>Section I: Student&apos;s Legal Name, Contact Data and Information (Do not use nicknames)</h4>
                                     <h5 style={{ textAlign: 'center' }}> Please make sure to do Essay first! </h5>

                                     <form onSubmit={handleSubmit}>
                                         <div className="row mb-3">
                                             <div className="col">
                                                 <label htmlFor="text" className="col-form-label">Last/Family Name:</label>
                                             </div>
                                             <div className="col-4">
                                                 <input type="text" className="form-control form-control-sm" name="lastName" id="text" />
                                             </div>


                                             <div className="col">
                                                 <label htmlFor="text" className="col-form-label"> First/Given Name: </label>
                                             </div>
                                             <div className="col-4">
                                                 <input type="text" className="form-control form-control-sm" name="firstName" id="text" />
                                             </div>
                                         </div> {/* First row */}
                                         <div className="row mb-3">
                                             <div className="col">
                                                 <label htmlFor="text" className="col-form-label"> Middle Name: </label>
                                             </div>
                                             <div className="col-4">
                                                 <input type="text" className="form-control form-control-sm" name="middleName" id="text" />
                                             </div>

                                             <div className="col">
                                                 <label htmlFor="text" className="col-form-label"> Perferred Name: </label>
                                             </div>
                                             <div className="col-4">
                                                 <input type="text" className="form-control form-control-sm" name="perferredName" id="text" />
                                             </div>

                                         </div> {/*row*/}
        
                                      <div className="row mb-3">
                                          <div className="col">
                                              <label htmlFor="text" className="col-form-label"> Student Phone Number: </label>
                                          </div>
                                          <div className="col-4">
                                              <input
                                                  type="tel"
                                                  className="form-control form-control-sm"
                                                  name="studentPhone"
                                                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                                    required="" />
                                            </div>
                                           
                                            <div className="col">
                                                <label htmlFor="text" className="col-form-label"> Sex:  </label>
                                            </div> 
                                                <div className="col-4">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="checkbox" id="male" name="sex" value="male" />
                                                        <label className="form-check-label" htmlFor="male"> Male</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="checkbox" id="female" name="sex" value="female" />
                                                        <label className="form-check-label" htmlFor="female">Female</label>
                                                    </div>
                                                </div>
                                        </div>    {/* second row */}
                                        <br />
                                         <div className="row">  {/*start of third row */}

                                             <div className="col">
                                                 <label> School: </label>
                                             </div>
                                             <div className="col-4">
                                                 <div className="form-check">
                                                     <input className="form-check-input" type="checkbox" name="school" value="JamesWeldonJohnsonCollegePrep" id="JamesWeldonJohnsonCollegePrep" />
                                                     <label className="form-check-label" htmlFor="JamesWeldonJohnSonCollegePrep"> James Weldon Johnson College Prep  </label>
                                                 </div>
                                                 <div className="form-check">
                                                     <input className="form-check-input" type="checkbox" name="school" value="JuliaLandonCollegePrep" id="JuliaLandonCollegePrep" />
                                                     <label className="form-check-label" htmlFor="JuliaLandonCollegePrep"> Julia Landon College Prep  </label>
                                                 </div>
                                                 <div className="form-check">
                                                     <input className="form-check-input" type="checkbox" name="school" id="other" />
                                                     <label className="form-check-label" htmlFor="other"> Other </label>
                                                 </div>
                                             </div>
                                             <div className="col">
                                                 <label> Current Grade Level: </label>
                                             </div>
                                             <div className="col-4">
                                                 <div className="row">
                                                     <div className="col-4">
                                                         <div className="form-check">
                                                             <input className="form-check-input" type="checkbox" name="grade" value="6" id="6" />
                                                             <label className="form-check-label" htmlFor="6"> 6th </label>
                                                         </div>
                                                         <div className="form-check">
                                                             <input className="form-check-input" type="checkbox" name="grade" value="7" id="7" />
                                                             <label className="form-check-label" htmlFor="7"> 7th  </label>
                                                         </div>
                                                     </div>
                                                     <div className="col">
                                                         <div className="form-check">
                                                             <input className="form-check-input" type="checkbox" name="grade" value="8" id="8" />
                                                             <label className="form-check-label" htmlFor="8"> 8th  </label>
                                                         </div>
                                                         <div className="form-check">
                                                             <input className="form-check-input" type="checkbox" name="grade" id="other" />
                                                             <label className="form-check-label" htmlFor="other"> Other </label>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>

                                         </div> {/* third row end */}
                                        <br />
                                        <div className="row">
                                            <div className="col">
                                                <label> Date of Birth: </label>
                                            </div> 
                                            <div className = "col-4"> 
                                                <input type="date" className="form-control form-control-sm" name="dob" />
                                               
                                            </div>
                                            <div className = "col"> 
                                                <label> Do you have a passport? </label>
                                            </div>
                                             <div className="col-4">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="checkbox" id="yes" name="passport" value="yes" />
                                                        <label className="form-check-label" htmlFor="yes"> Yes</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="checkbox" id="no" name="passport" value="no" />
                                                        <label className="form-check-label" htmlFor="no"> No </label>
                                                    </div>
                                             </div>
                                        </div> 
                                        <br/> 
                                        <div className = "row mb-3"> 
                                            <div className = "col"> 
                                                <label> Passport Expiration Date: </label>
                                            </div>
                                            <div className = "col-4"> 
                                                <input type="date" className="form-control form-control-sm" name="passportexp" />
                                            </div>
                                            <div className="col">
                                                <label> Passport Country: </label> 
                                            </div> 
                                            <div className = "col-4"> 
                                                <input type="text" className="form-control form-control-sm" name="passportCount" id="text" />
                                            </div>
                                        </div> 
                                     

                                        <h6 style={{ textAlign: 'center' }}> Dual or multiple citizenship holders: provide information from the passport
                                            you will use for travel to/within/from the country where the exchange program is located. </h6>
                                        <br />
                                        <div className="row">
                                            <div className="col"> </div>
                                            <div className="col">
                                                <div style={{ textAlign: 'center', width: '600px' }} className="form-floating">
                                                    <textarea className="form-control" id="textbox" style={{ height: '200px' }} name="allergies" ></textarea>
                                                    <label htmlFor="textbox"> Allergies and Dietary Restrictions: </label>
                                                </div>
                                            </div>
                                            <div className="col"> </div>
                                        </div> {/* 5th row end */}
                                        <br />
                                        <h4 style={{ textAlign: 'center' }}>Section II: Parent&apos;s Name, Address and Contact Info</h4>
                                        <br />
                                        <div className="row">
                                            
                                            <div className="col">
                                                <label>Full Name of Parent 1: </label>
                                            </div> 
                                            <div className = "col-4"> 
                                                <input type="text" className="form-control form-control-sm" name="parentname" id="text" /> 
                                            </div>
                                            <div className="col">
                                                <label> Full Name of Parent 2:</label>
                                            </div> 
                                            <div className = "col-4"> 
                                                <input type="text" className="form-control form-control-sm" name="parenttwoname" id="text" />
                                            </div>

                                        </div> {/* 6th row end */}
                                        <br/> 
                                         <div className="row">
                                             <div className="col d-flex align-items-center">
                                                 <label htmlFor="street" className="form-label">Street Address:</label>
                                                 <input type="text" className="form-control form-control-sm" id="street" name="street" />
                                             
                                             </div>  
                                         </div>
                                         <br/> 

                                         <div className="row">
                                            <div className="col">
                                                <label htmlFor="city" className="form-label" name="city" > City </label>
                                            </div> 
                                            <div className = "col-md-4"> 
                                                <input type="text" className="form-control" id="city" name="city" />
                                                <div className="invalid-feedback"> Please provide a valid city. </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="state" className="form-label" name="state"> State </label>
                                            </div> 
                                            <div className = "col-md-3"> 
                                                <input type="text" className="form-control" id="state" name="state" />
                                                <div className="invalid-feedback"> Please provide a valid state. </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="zip" className="form-label" name="zip"> ZIP </label>
                                            </div> 
                                            <div className = "col-md-2"> 
                                                <input type="text" className="form-control" id="zip" name="zip" />
                                                <div className="invalid-feedback"> Please provide a valid zip code. </div>
                                            </div>
                                        </div> {/* 7th row end */}
                                        <br />
                                        <div className="row">
                                            <div className="col">
                                                <label> Parent 1 Phone Number: </label> 
                                            </div> 
                                            <div className = "col-4"> 
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="parentonePhone"
                                                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                                        required="" />
                                                
                                            </div>
                                            <div className="col">
                                                <label> Parent 2 Phone Number:</label>
                                            </div> 
                                            <div className = "col-4"> 
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="parenttwoPhone"
                                                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                                        required="" />
                                                
                                            </div>

                                        </div> {/* 6th row end */}
                                        <br/> 
                                        <div className="row">
                                             <div className="col d-flex align-items-center">
                                                <label style={{ textAlign: 'center' }} htmlFor="parentemail" className="form-label" name="parentemail" > Primary Email  </label>
                                                <input type="text" className="form-control form-control-sm" id="parentemail" name="parentemail" />
                                            </div>
                                        </div>
                                        <br />
                                        { /* PARENT SIGNATURE */}
                                        <h6 style={{ textAlign: 'center', textDecorationColor: 'red' }} > This acts as an electronic signiture. </h6>
                                        <br />
                                        <div className="row">
                                            
                                            <div className="col">
                                                <label style={{ textAlign: 'center' }} htmlFor="signparent" className="form-label" name="signparent" > Parent Signature </label>
                                            </div> 
                                            <div className = "col-4"> 
                                                <input type="text" className="form-control form-control-sm" id="signparent" name="signparent" />
                                            </div>
                                            <div className="col" >
                                                <label> Date: </label> 
                                            </div>
                                            <div className = "col-4"> 
                                                <input type="date" className="form-control form-control-sm" name="signdate" />
                                            </div>
                                            
                                        </div>


                                        <br />
                                        <h4 style={{ textAlign: 'center' }}>Section III: Student Exchange Host & Travel Interest</h4>
                                        <br />
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="hostandTravel" name="host" value="Host and Travel" />
                                                    <label className="form-check-label" htmlFor="hostandTravel"> Host Family* and Travel </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="host" name="host" value="host" />
                                                    <label className="form-check-label" htmlFor="host"> Host Family* Only </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="travel" name="host" value="travel" />
                                                    <label className="form-check-label" htmlFor="travel">Travel Only </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label> If needed, are you willing to host a second family?  </label>

                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="yes" name="hostfam" value="yes" />
                                                    <label className="form-check-label" htmlFor="yes"> Yes</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="no" name="hostfam" value="no" />
                                                    <label className="form-check-label" htmlFor="no"> No </label>
                                                </div>
                                            </div>
                                        </div> {/* row */}
                                        <br />
                                        <input type="hidden" value={currentID} className="form-control" id="student" name="student" />
                                        <input type="hidden" value={eventID} className="form-control" id="event" name="event" />
                                        { /* UPLOAD ESSAY */}
                                        <div className="col-sm-12 text-center">
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                router.push(`/Dashboard/People/exchange/${params.eventID}/${params.eventID}/EssayPage`);
                                            }} value="submit" className="btn btn-primary"> Essay</button>
                                            <button type="submit" value="submit" className="btn btn-primary">  Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};
export default StudentForm;
