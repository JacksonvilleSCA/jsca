import React from 'react';
import Link from 'next/link'; 
import essay from '../essay/page';
import { POST } from '@/app/api/routes/essayroutes';

 const StudentForm = () => {
  
  return (
    <>
    <div className="page-container">
    <h2 style={{ textAlign: 'center' }}>
                Jacksonville Sister Cities  Landon Middle Student Exchange Program Application Form</h2>
        <div class =" contrainer">
            <h4 style={{ textAlign: 'center' }}>Section I: Student&apos;s Legal Name, Contact Data and Information (Do not use nicknames)</h4>

            <form action={POST}>
            <div class = "row">
                <div class = "col"> </div>
                <div class = "col">
                    <label>
                        Last/Family Name:
                        <input type="text" class = "form-control" name="lastName" id="text" />
                    </label>
                </div>
                <div class = "col"> 
                    <label>
                        First/Given Name:
                        <input type="text"class = "form-control" name="firstName" id="text" />
                     </label>
                </div>
               <div class = "col">
                    <label>
                        Middle Name:
                        <input type="text" class = "form-control" name="middleName" id="text" />
                    </label>
                </div>
                <div class = "col"> </div>
            </div> {/* First row */}
            <br /> 
            <div class = "row"> 
            <div class = "col"> </div>
                <div class = "col"> 
                    <label>
                        Perferred Name:
                        <input type="text" class = "form-control" name="perferredName" id="text" />
                    </label>
                </div>
                <div class = "col"> 
                    <label>
                        Student Phone Number:
                        <input
                            type="tel"
                            class = "form-control"
                            name="studentPhone"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            required="" />
                    </label>
                </div>
                <div class = "col"> 
                <label> Sex:  </label>
                    <div class = "col"> 
                    <div class = "form-check form-check-inline"> 
                        <input class = "form-check-input" type = "checkbox" id = "male" name = "sex" value ="male"/> 
                        <label class = "form-check-label" for = "male"> Male</label>
                    </div>
                    <div class = "form-check form-check-inline"> 
                        <input class = "form-check-input" type = "checkbox" id = "female" name = "sex" value ="female"/> 
                        <label class = "form-check-label" for = "female">Female</label>
                    </div>
                    </div>
                </div>
                <div class = "col"> </div>
            </div>    {/* second row */}
            <br /> 
            <div class = "row">  {/*start of third row */}
            
                <div class = "col"> 
                <label>
                    Date of Birth:
                    <input type="date" class = "form-control" name ="dob"/>
                </label>
                </div>
                <div class = "col"> 
                <label> School: </label>
                    <div class = "form-check"> 
                        <input class = "form-check-input" type = "checkbox" name = "school" value ="JamesWeldonJohnsonCollegePrep" id = "JamesWeldonJohnsonCollegePrep"/>
                        <label class = "form-check-label" for = "JamesWeldonJohnSonCollegePrep"> James Weldon Johnson College Prep  </label>    
                    </div>
                    <div class = "form-check"> 
                        <input class = "form-check-input" type = "checkbox" name = "school" value ="JuliaLandonCollegePrep" id = "JuliaLandonCollegePrep"/>
                        <label class = "form-check-label" for = "JuliaLandonCollegePrep"> Julia Landon College Prep  </label>    
                    </div>
                    <div class = "form-check"> 
                        <input class = "form-check-input" type = "checkbox" name = "school"  id = "other"/>
                        <label class = "form-check-label" for = "other"> Other </label>    
                    </div>
                </div>
                <div class = "col"> 
                <div class = "row"> 
                    
                    <label> Current Grade Level: </label>
                    <div class = "col">
                    <div class = "form-check"> 
                        <input class = "form-check-input" type = "checkbox" name = "grade" value ="6" id = "6"/>
                        <label class = "form-check-label" for = "6"> 6th </label>    
                    </div>
                    <div class = "form-check"> 
                        <input class = "form-check-input" type = "checkbox" name = "grade" value ="7" id = "7"/>
                        <label class = "form-check-label" for = "7"> 7th  </label>    
                    </div>
                    </div>
                    <div class = "col"> 
                    <div class = "form-check"> 
                        <input class = "form-check-input" type = "checkbox" name = "grade" value ="8" id = "8"/>
                        <label class = "form-check-label" for = "8"> 8th  </label>    
                    </div>
                    <div class = "form-check"> 
                        <input class = "form-check-input" type = "checkbox" name = "grade"  id = "other"/>
                        <label class = "form-check-label" for = "other"> Other </label>    
                    </div>
                    </div>
                    </div>
                </div>
                
            </div> {/* third row end */}
            <br /> 
            <div class = "row"> 
                <div class = "col"> 
                    <label> Select Program(s) of Interest: </label>
                        <div class = "col"> 
                            <div class = "form-check"> 
                                <input class = "form-check-input" type = "checkbox" name = "proInterest1" value ="SouthAfrica" id = "SouthAfrica"/>
                                <label class = "form-check-label" for = "SouthAfrica"> South Africa </label>    
                             </div>
                             <div class = "form-check"> 
                                 <input class = "form-check-input" type = "checkbox" name = "proInterest2" value ="South Korea" id = "South Korea"/>
                                 <label class = "form-check-label" for = "South Korea"> South Korea  </label>    
                             </div>
                             <div class = "form-check"> 
                                 <input class = "form-check-input" type = "checkbox" name = "proInterest3" value ="Puerto Rico" id = "Puerto Rico"/>
                                 <label class = "form-check-label" for = "Puerto Rico"> Puerto Rico  </label>    
                             </div>
                        </div>
                </div> 
                <div class = "col"> 
                    <label> Do you have a passport? </label>
                        <div class = "col"> 
                            <div class = "form-check form-check-inline"> 
                                <input class = "form-check-input" type = "checkbox" id = "yes" name = "passport" value ="yes"/> 
                                <label class = "form-check-label" for = "yes"> Yes</label>
                             </div>
                             <div class = "form-check form-check-inline"> 
                                <input class = "form-check-input" type = "checkbox" id = "no" name = "passport" value ="no"/> 
                                <label class = "form-check-label" for = "no"> No </label>
                             </div>
                        </div>
                    <label>
                        Passport Expiration Date: 
                        <input type="date"class = "form-control" name = "passportexp" />
                    </label>   
                </div>
                
                <div class = "col">
                    <label>
                        Passport Country: 
                        <input type="text" class = "form-control" name="passportCount" id="text" />
                    </label>
                </div>
                
            </div> {/* 4th row end */}
            <br/>
            
           <h6 style={{ textAlign: 'center' }}> Dual or multiple citizenship holders: provide information from the passport
                you will use for travel to/within/from the country where the exchange
                program is located. </h6>
            <br />
            <div class = "row"> 
            <div class = "col"> </div>
            <div class = "col"> 
            <div style={{ textAlign: 'center' , width: '600px'}} class = "form-floating">
                <textarea class = "form-control" id = "textbox" style = {{height: '200px'}} name = "allergies" ></textarea>
                <label for = "textbox"> Allergies and Dietary Restrictions: </label>
            </div>
            </div> 
            <div class = "col"> </div>
            </div> {/* 5th row end */}
            <br/> 
            <h4 style={{ textAlign: 'center' }}>Section II: Parent&apos;s Name, Address and Contact Info</h4>
            <br />
            <div class = "row">
            <div class = "col"> </div>
                <div class = "col">
                    <label>
                        First/Last Name of Parent 1: 
                        <input type="text" class = "form-control" name="parentname" id="text" />
                    </label>
                </div>
                <div class = "col"> 
                    <label>
                        First/Last Name of Parent 2: 
                        <input type="text"class = "form-control" name="parenttwoname" id="text" />
                     </label>
                </div>
                <div class = "col"> </div>
              
            </div> {/* 6th row end */}
            <div class = "row"> 
                <div class = "col"> 
                     <label style = {{textAlign: 'center' }} for ="street" class = "form-label" name = "street" > Street Number and Street  </label> 
                    <input type = "text" class = "form-control" id = "street" name = "street" /> 
                </div>
            </div>
            <div class = "row"> 
                <div class = "col-md-6">
                    <label for ="city" class = "form-label" name = "city" > City </label> 
                    <input type = "text" class = "form-control" id = "city" name = "city" /> 
                    <div class = "invalid-feedback"> Please provide a valid city. </div>
                </div>
                <div class = "col-md-3"> 
                    <label for ="state" class = "form-label" name = "state"> State </label>
                    <input type = "text" class = "form-control" id = "state" name = "state"/> 
                    <div class = "invalid-feedback"> Please provide a valid state. </div>
                </div>
                <div class = "col-md-3"> 
                    <label for ="zip" class = "form-label" name = "zip"> ZIP </label>
                    <input type = "text" class = "form-control" id = "zip" name = "zip"/> 
                    <div class = "invalid-feedback"> Please provide a valid zip code. </div>
                </div>
            </div> {/* 7th row end */}
            <br />
            <div class = "row">
            <div class = "col"> </div>
                <div class = "col">
                    <label>
                        Parent 1 Phone Number: 
                        <input
                            type="tel"
                            class = "form-control"
                            name="parentonePhone"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            required="" />
                    </label>
                </div>
                <div class = "col"> 
                    <label>
                        Parent 2 Phone Number: 
                        <input
                            type="tel"
                            class = "form-control"
                            name="parenttwoPhone"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            required="" />
                     </label>
                </div>
                <div class = "col"> </div>
              
            </div> {/* 6th row end */}

            <div class = "row"> 
                <div class = "col"> 
                     <label style = {{textAlign: 'center' }} for ="email" class = "form-label" name = "email" > Primary Email  </label> 
                    <input type = "text" class = "form-control" id = "email" name = "email" /> 
                </div>
            </div>
            <br />
             { /* PARENT SIGNATURE */ } 
             <h6 style={{textAlign: 'center', textDecorationColor: 'red'}} > This acts as an electronic signiture. </h6>
            <br />
            <div class = "row"> 
            <div class = "col"> </div>
                <div class = "col"> 
                     <label style = {{textAlign: 'center' }} for ="signparent" class = "form-label" name = "signparent" > Parent Signature </label> 
                    <input type = "text" class = "form-control" id = "signparent" name = "signparent" /> 
                </div>
                <div class = "col" >
                <label>
                    Date
                    <input type="date" class = "form-control" name ="signdate"/>
                </label>
                </div>
                <div class = "col"> </div>
            </div>
           
           
            <br />
            <h4 style={{ textAlign: 'center' }}>Section III: Student Exchange Host & Travel Interest</h4>
            <br/> 
            <div class = "row"> 
                <div class = "col"> 
                    <div class = "form-check form-check-inline"> 
                        <input class = "form-check-input" type = "checkbox" id = "hostandTravel" name = "host" value ="Host and Travel"/> 
                        <label class = "form-check-label" for = "hostandTravel"> Host Family* and Travel </label>
                    </div>
                    <div class = "form-check form-check-inline"> 
                        <input class = "form-check-input" type = "checkbox" id = "host" name = "host" value ="host"/> 
                        <label class = "form-check-label" for = "host"> Host Family* Only </label>
                    </div>
                    <div class = "form-check form-check-inline"> 
                        <input class = "form-check-input" type = "checkbox" id = "travel" name = "host" value ="travel"/> 
                        <label class = "form-check-label" for = "travel">Travel Only </label>
                    </div>
                </div>
                <div class = "col"> 
                <label> If needed, are you willing to host a second family?  </label>
                        
                            <div class = "form-check form-check-inline"> 
                                <input class = "form-check-input" type = "checkbox" id = "yes" name = "hostfam" value ="yes"/> 
                                <label class = "form-check-label" for = "yes"> Yes</label>
                             </div>
                             <div class = "form-check form-check-inline"> 
                                <input class = "form-check-input" type = "checkbox" id = "no" name = "hostfam" value ="no"/> 
                                <label class = "form-check-label" for = "no"> No </label>
                             </div>
                    </div>
            </div> {/* row */}
            <br/>

             { /* UPLOAD ESSAY */ }
             <div class = "col-sm-12 text-center">
             <a class="btn btn-primary" href='/essay' role="button">Essay</a>
            <button type = "submit" value= "submit" class="btn btn-primary">  Submit</button>
            </div>
        </form>
        </div>
        <div class="alert alert-success" role="alert">
            A simple success alert—check it out!
        </div>
    </div>  
    </>
    ); 
}; 
export default StudentForm;
