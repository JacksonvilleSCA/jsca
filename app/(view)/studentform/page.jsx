"use client"
import React from 'react';
import Link from 'next/link'; 
import essay from '../essay/page';
import { POST } from '@/app/api/routes/essayroutes';
import { getAllForms } from '@/app/api/routes/essayroutes';
import {useEffect } from "react"; 
import {useRouter} from 'next/navigation';
import { useState } from 'react';
import NavTwo from "@/app/components/Nav2"


 const StudentForm = ({params}) => {
    console.log(params)
    const router = useRouter();
    const [essay, setEssay] = useState('');
    const [formData, setFormData] = useState(null); 

    useEffect(() => {
        const checkApplication = async () => {
            const uid = sessionStorage.getItem('uid');
            if (!uid) {
                router.push('/login');
            } else {
                try {
                    const formsData = await getAllForms(); 
                    if (formsData.find (form=> form.user === uid)) {
                        router.push('/studentViewForm'); 
                    }
                } catch (error) {
                    console.error('Error checking if user has submitted an application:', error);
                }
            }
        };
    
        checkApplication();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submittedEssay = sessionStorage.getItem('essay');
        if (!submittedEssay) {
            alert("Please fill out the essay before submitting the form.");
            return;
        }

        const formData = new FormData(e.target);
        formData.append("essay", submittedEssay);
        formData.append("uid", sessionStorage.getItem('uid'));

        try {
            const response = await POST(formData);
            router.push(`/studentViewForm`);
            sessionStorage.removeItem('essay');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
  return (
    <>
    <div> 
    <NavTwo/> 
    <div className="page-container">
    <h2 style={{ textAlign: 'center' }}>
                Jacksonville Sister Cities  Landon Middle Student Exchange Program Application Form</h2>
        <div className =" contrainer">
            <h4 style={{ textAlign: 'center' }}>Section I: Student&apos;s Legal Name, Contact Data and Information (Do not use nicknames)</h4>

            <form onSubmit = {handleSubmit}>
            <div className = "row">
                <div className = "col"> </div>
                <div className = "col">
                    <label>
                        Last/Family Name:
                        <input type="text" className = "form-control" name="lastName" id="text" />
                    </label>
                </div>
                <div className = "col"> 
                    <label>
                        First/Given Name:
                        <input type="text"className = "form-control" name="firstName" id="text" />
                     </label>
                </div>
               <div className = "col">
                    <label>
                        Middle Name:
                        <input type="text" className = "form-control" name="middleName" id="text" />
                    </label>
                </div>
                <div className = "col"> </div>
            </div> {/* First row */}
            <br /> 
            <div className = "row"> 
            <div className = "col"> </div>
                <div className = "col"> 
                    <label>
                        Perferred Name:
                        <input type="text" className = "form-control" name="perferredName" id="text" />
                    </label>
                </div>
                <div className = "col"> 
                    <label>
                        Student Phone Number:
                        <input
                            type="tel"
                            className = "form-control"
                            name="studentPhone"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            required="" />
                    </label>
                </div>
                <div className = "col"> 
                <label> Sex:  </label>
                    <div className = "col"> 
                    <div className = "form-check form-check-inline"> 
                        <input className = "form-check-input" type = "checkbox" id = "male" name = "sex" value ="male"/> 
                        <label className = "form-check-label" htmlFor = "male"> Male</label>
                    </div>
                    <div className = "form-check form-check-inline"> 
                        <input className = "form-check-input" type = "checkbox" id = "female" name = "sex" value ="female"/> 
                        <label className = "form-check-label" htmlFor = "female">Female</label>
                    </div>
                    </div>
                </div>
                <div className = "col"> </div>
            </div>    {/* second row */}
            <br /> 
            <div className = "row">  {/*start of third row */}
            
                <div className = "col"> 
                <label>
                    Date of Birth:
                    <input type="date" className = "form-control" name ="dob"/>
                </label>
                </div>
                <div className = "col"> 
                <label> School: </label>
                    <div className = "form-check"> 
                        <input className = "form-check-input" type = "checkbox" name = "school" value ="JamesWeldonJohnsonCollegePrep" id = "JamesWeldonJohnsonCollegePrep"/>
                        <label className = "form-check-label" htmlFor = "JamesWeldonJohnSonCollegePrep"> James Weldon Johnson College Prep  </label>    
                    </div>
                    <div className = "form-check"> 
                        <input className = "form-check-input" type = "checkbox" name = "school" value ="JuliaLandonCollegePrep" id = "JuliaLandonCollegePrep"/>
                        <label className = "form-check-label" htmlFor = "JuliaLandonCollegePrep"> Julia Landon College Prep  </label>    
                    </div>
                    <div className = "form-check"> 
                        <input className = "form-check-input" type = "checkbox" name = "school"  id = "other"/>
                        <label className = "form-check-label" htmlFor = "other"> Other </label>    
                    </div>
                </div>
                <div className = "col"> 
                <div className = "row"> 
                    
                    <label> Current Grade Level: </label>
                    <div className = "col">
                    <div className = "form-check"> 
                        <input className = "form-check-input" type = "checkbox" name = "grade" value ="6" id = "6"/>
                        <label className = "form-check-label" htmlFor = "6"> 6th </label>    
                    </div>
                    <div className = "form-check"> 
                        <input className = "form-check-input" type = "checkbox" name = "grade" value ="7" id = "7"/>
                        <label className = "form-check-label" htmlFor = "7"> 7th  </label>    
                    </div>
                    </div>
                    <div className = "col"> 
                    <div className = "form-check"> 
                        <input className = "form-check-input" type = "checkbox" name = "grade" value ="8" id = "8"/>
                        <label className = "form-check-label" htmlFor = "8"> 8th  </label>    
                    </div>
                    <div className = "form-check"> 
                        <input className = "form-check-input" type = "checkbox" name = "grade"  id = "other"/>
                        <label className = "form-check-label" htmlFor = "other"> Other </label>    
                    </div>
                    </div>
                    </div>
                </div>
                
            </div> {/* third row end */}
            <br /> 
            <div className = "row"> 
                {/* <div className = "col"> 
                    <label> Select Program(s) of Interest: </label>
                        <div className = "col"> 
                            <div className = "form-check"> 
                                <input className = "form-check-input" type = "checkbox" name = "proInterest1" value ="SouthAfrica" id = "SouthAfrica"/>
                                <label className = "form-check-label" htmlFor = "SouthAfrica"> South Africa </label>    
                             </div>
                             <div className = "form-check"> 
                                 <input className = "form-check-input" type = "checkbox" name = "proInterest2" value ="South Korea" id = "South Korea"/>
                                 <label className = "form-check-label" htmlFor = "South Korea"> South Korea  </label>    
                             </div>
                             <div className = "form-check"> 
                                 <input className = "form-check-input" type = "checkbox" name = "proInterest3" value ="Puerto Rico" id = "Puerto Rico"/>
                                 <label className = "form-check-label" htmlFor = "Puerto Rico"> Puerto Rico  </label>    
                             </div>
                        </div>
                </div>  */}
                <div className = "col"> 
                    <label> Do you have a passport? </label>
                        <div className = "col"> 
                            <div className = "form-check form-check-inline"> 
                                <input className = "form-check-input" type = "checkbox" id = "yes" name = "passport" value ="yes"/> 
                                <label className = "form-check-label" htmlFor = "yes"> Yes</label>
                             </div>
                             <div className = "form-check form-check-inline"> 
                                <input className = "form-check-input" type = "checkbox" id = "no" name = "passport" value ="no"/> 
                                <label className = "form-check-label" htmlFor = "no"> No </label>
                             </div>
                        </div>
                    <label>
                        Passport Expiration Date: 
                        <input type="date"className = "form-control" name = "passportexp" />
                    </label>   
                </div>
                
                <div className = "col">
                    <label>
                        Passport Country: 
                        <input type="text" className = "form-control" name="passportCount" id="text" />
                    </label>
                </div>
                
            </div> {/* 4th row end */}
            <br/>
            
           <h6 style={{ textAlign: 'center' }}> Dual or multiple citizenship holders: provide information from the passport
                you will use htmlFor travel to/within/from the country where the exchange
                program is located. </h6>
            <br />
            <div className = "row"> 
            <div className = "col"> </div>
            <div className = "col"> 
            <div style={{ textAlign: 'center' , width: '600px'}} className = "form-floating">
                <textarea className = "form-control" id = "textbox" style = {{height: '200px'}} name = "allergies" ></textarea>
                <label htmlFor = "textbox"> Allergies and Dietary Restrictions: </label>
            </div>
            </div> 
            <div className = "col"> </div>
            </div> {/* 5th row end */}
            <br/> 
            <h4 style={{ textAlign: 'center' }}>Section II: Parent&apos;s Name, Address and Contact Info</h4>
            <br />
            <div className = "row">
            <div className = "col"> </div>
                <div className = "col">
                    <label>
                        First/Last Name of Parent 1: 
                        <input type="text" className = "form-control" name="parentname" id="text" />
                    </label>
                </div>
                <div className = "col"> 
                    <label>
                        First/Last Name of Parent 2: 
                        <input type="text"className = "form-control" name="parenttwoname" id="text" />
                     </label>
                </div>
                <div className = "col"> </div>
              
            </div> {/* 6th row end */}
            <div className = "row"> 
                <div className = "col"> 
                     <label style = {{textAlign: 'center' }} htmlFor ="street" className = "form-label" name = "street" > Street Number and Street  </label> 
                    <input type = "text" className = "form-control" id = "street" name = "street" /> 
                </div>
            </div>
            <div className = "row"> 
                <div className = "col-md-6">
                    <label htmlFor ="city" className = "form-label" name = "city" > City </label> 
                    <input type = "text" className = "form-control" id = "city" name = "city" /> 
                    <div className = "invalid-feedback"> Please provide a valid city. </div>
                </div>
                <div className = "col-md-3"> 
                    <label htmlFor ="state" className = "form-label" name = "state"> State </label>
                    <input type = "text" className = "form-control" id = "state" name = "state"/> 
                    <div className = "invalid-feedback"> Please provide a valid state. </div>
                </div>
                <div className = "col-md-3"> 
                    <label htmlFor ="zip" className = "form-label" name = "zip"> ZIP </label>
                    <input type = "text" className = "form-control" id = "zip" name = "zip"/> 
                    <div className = "invalid-feedback"> Please provide a valid zip code. </div>
                </div>
            </div> {/* 7th row end */}
            <br />
            <div className = "row">
            <div className = "col"> </div>
                <div className = "col">
                    <label>
                        Parent 1 Phone Number: 
                        <input
                            type="tel"
                            class = "form-control"
                            name="parentphone"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            required="" />
                    </label>
                </div>
                <div className = "col"> 
                    <label>
                        Parent 2 Phone Number: 
                        <input
                            type="tel"
                            class = "form-control"
                            name="parenttwophone"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            required="" />
                     </label>
                </div>
                <div className = "col"> </div>
              
            </div> {/* 6th row end */}

            <div class = "row"> 
                <div class = "col"> 
                     <label style = {{textAlign: 'center' }} for ="email" class = "form-label" name = "parentemail" > Primary Email  </label> 
                    <input type = "text" class = "form-control" id = "parentemail" name = "parentemail" /> 
                </div>
            </div>
            <br />
             { /* PARENT SIGNATURE */ } 
             <h6 style={{textAlign: 'center', textDecorationColor: 'red'}} > This acts as an electronic signiture. </h6>
            <br />
            <div className = "row"> 
            <div className = "col"> </div>
                <div className = "col"> 
                     <label style = {{textAlign: 'center' }} htmlFor ="signparent" className = "form-label" name = "signparent" > Parent Signature </label> 
                    <input type = "text" className = "form-control" id = "signparent" name = "signparent" /> 
                </div>
                <div className = "col" >
                <label>
                    Date
                    <input type="date" className = "form-control" name ="signdate"/>
                </label>
                </div>
                <div className = "col"> </div>
            </div>
           
           
            <br />
            <h4 style={{ textAlign: 'center' }}>Section III: Student Exchange Host & Travel Interest</h4>
            <br/> 
            <div className = "row"> 
                <div className = "col"> 
                    <div className = "form-check form-check-inline"> 
                        <input className = "form-check-input" type = "checkbox" id = "hostandTravel" name = "host" value ="Host and Travel"/> 
                        <label className = "form-check-label" htmlFor = "hostandTravel"> Host Family* and Travel </label>
                    </div>
                    <div className = "form-check form-check-inline"> 
                        <input className = "form-check-input" type = "checkbox" id = "host" name = "host" value ="host"/> 
                        <label className = "form-check-label" htmlFor = "host"> Host Family* Only </label>
                    </div>
                    <div className = "form-check form-check-inline"> 
                        <input className = "form-check-input" type = "checkbox" id = "travel" name = "host" value ="travel"/> 
                        <label className = "form-check-label" htmlFor = "travel">Travel Only </label>
                    </div>
                </div>
                <div className = "col"> 
                <label> If needed, are you willing to host a second family?  </label>
                        
                            <div className = "form-check form-check-inline"> 
                                <input className = "form-check-input" type = "checkbox" id = "yes" name = "hostfam" value ="yes"/> 
                                <label className = "form-check-label" htmlFor = "yes"> Yes</label>
                             </div>
                             <div className = "form-check form-check-inline"> 
                                <input className = "form-check-input" type = "checkbox" id = "no" name = "hostfam" value ="no"/> 
                                <label className = "form-check-label" htmlFor = "no"> No </label>
                             </div>
                    </div>
            </div> {/* row */}
            <br/>
            <input type="hidden" value={params.eventID}  className = "form-control" id = "event" name = "event" />
             { /* UPLOAD ESSAY */ }
             <div className = "col-sm-12 text-center">
            <button onClick={(e) => {
                 e.preventDefault();
                 router.push(`/essay`);
            }} value= "submit" className="btn btn-primary"> Essay</button>
            <button type = "submit" value= "submit" className="btn btn-primary">  Submit</button>
            </div>
        </form>

        </div>
    </div>  
    </div> 
    </>
    ); 
}; 
export default StudentForm;
