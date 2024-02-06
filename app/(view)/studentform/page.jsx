import React from 'react';
import Link from 'next/link'; 
import essay from '../essay/page';
import { POST } from '@/app/api/routes/essayroutes';

 const StudentForm = () => {
  
  return (
    <>
    <div className="page-container">
    <h1 style={{ textAlign: 'center' }}>
                Jacksonville Sister Cities  Landon Middle Student Exchange Program Application Form</h1>
            <h1 style={{ textAlign: 'center' }}>Section I: Student&apos;s Legal Name, Contact Data and Information (Do not use nicknames)</h1>

            <form action={POST}>
            <label>
                Last/Family Name:
                <input type="text" name="lastName" id="text" />
            </label>
            <br /> <br />
            <label>
             {" "}
                First/Given Name:
                <input type="text" name="firstName" id="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Middle Name:
                <input type="text" name="middleName" id="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Perferred Name:
                <input type="text" name="perferredName" id="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Student Phone Number:
                <input
                    type="tel"
                    name="studentPhone"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    required="" />
            </label>
            <br />
            <br />
            <label> Sex at Birth </label>
            <input type="radio" id="male"name = "sex" value = "male" />
            <label htmlFor="male"> Male </label>
            <input type="radio" id="female" name = "sex" value = "female" />
            <label htmlFor="female"> Female </label>
            <br /> <br />
            <label>
                {" "}
                Date of Birth
                <input type="date" name ="dob"/>
            </label>
            <br /> <br />
            <label> School: </label>
            <br />
            <br />
            <input type="radio" id="JWJCP" name ="school" value = "JamesWeldonJohnsonCollegePrep" />
            <label htmlFor="JWJCP"> James Weldon Johnson College Prep </label>
            <br />
            <br />
            <input type="radio" id="JLCP" name ="school" value = "JuliaLandonCollegePrep" />
            <label htmlFor="JLCP"> Julia Landon College Prep </label>
            <br />
            <br />
            <input type="radio" id="other"/>
            <label htmlFor="other">
                {" "}
                Other <input type="text" name="school" />{" "}
            </label>
            <br />
            <br />
            <label> Current Grade Level: </label>
            <br />
            <br />
            <input type="radio" id={6} name ="grade"  value = "6" />
            <label htmlFor={6}> 6th </label>
            <input type="radio" id={7} name ="grade" value = "7" />
            <label htmlFor={7}> 7th </label>
            <input type="radio" id={8} name ="grade" value = "8" />
            <label htmlFor={8}> 8th </label>
            <input type="radio" id="other"  name ="grade"/>
            <label htmlFor="other">
                {" "}
                Other: <input type="text" name="text" />{" "}
            </label>
            <br />
            <br />
            <label> Select Program(s) of Interest: </label>
            <br />
            <br />
            <input type="radio" id="SouthA" name ="proInterest1"  value = "South Africa" />
            <label htmlFor="SouthA"> South Africa </label>
            <br />
            <br />
            <input type="radio" id="SouthK" name ="proInterest2"  value = "South Korea"/>
            <label htmlFor="SouthK"> South Korea </label>
            <br />
            <br />
            <input type="radio" id="PR" name ="proInterest3" value = "Puerto Rico" />
            <label htmlFor="PR"> Puerto Rico </label>
            <br />
            <br />
            <label> Do you have a passport? </label>
            <input type="radio" id="yes"  name = "passport" value = "yes"/>
            <label htmlFor="yes"> Yes </label>
            <input type="radio" id="no" name = "passport" value = "no" />
            <label htmlFor="no"> No </label>
            <br />
            <br />
            <label>
                {" "}
                List passport country:
                <input type="text" name="passportCount" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Dual or multiple citizenship holders: provide information from the passport
                you will use for travel to/within/from the country where the exchange
                program is located.{" "}
            </label>
            <br />
            <br />
            <label>
                {" "}
                Passport expiration date
                <input type="date" name = "passportexp" />
            </label>
            <br />
            <br />
            <label> Allergies and Dietary Restrictions: </label>
            <br />
            <br />
            <textarea name="allergies" id="textbox" rows={13} cols={63} defaultValue={" "} />
            <br />
            <br />
            <h1 style={{ textAlign: 'center' }}>Section II: Parent&apos;s Name, Address and Contract Data</h1>
            <br />
            <br />
            <label>
                {" "}
                First/Last Name of Parent 1:
                <input type="text" name="parentname" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                First/Last Name of Parent 2:
                <input type="text" name="parenttwoname" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Street Number and Street
                <input type="text" name="street" />
            </label>
            <br />
            <br />
            <label>
                City:
                <input type="text" name="city" />
            </label>
            <br />
            <br />
            <label id="state"> State: 
                <input type="text" name = "state" />

            </label>
            
            <br /> <br />
            <label>
                Zip Code:
                <input type="number" name="zip" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Parent 1&apos;s Phone Number:
                <input
                    type="tel"
                    name="parentphone"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    required="" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Parent 2&apos;s Phone Number:
                <input
                    type="tel"
                    name="parenttwophone"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    required="" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Primary E-mail:
                <input type="email" name="parentemail" id="mail" />
            </label>
            <br />
            <br />
             { /* PARENT SIGNATURE */ } 
            <br />
            <br />
            <label>
                {" "}
                Date <input type="date" name = "signdate" />{" "}
            </label>
            <br />
            <br />
            <label>
                {" "}
                Parent&apos;s Printed Name:
                <input type="text" name="signparent" />
            </label>
            <br />
            <br />
            <h1 style={{ textAlign: 'center' }}>Section III: Student Exchange Host & Travel Interest</h1>
            <input type="radio" id="HostandTravel" name="host" value="Host and Travel" />
            <label htmlFor="HostandTravel"> Host Family* and Travel </label>
            <input type="radio" id="Host" name = "host" value =" Host" />
            <label htmlFor="Host"> Host Family* Only </label>
            <input type="radio" id="Travel" name = "host" value = "Travel" />
            <label htmlFor="Travel"> Travel Only </label>
            <br />
            <br />
            <label>*Host a second family (if needed) </label>
            <input type="radio" id="yes" name = "hostfam" value = "yes" />
            <label htmlFor="yes"> Yes </label>
            <input type="radio" id="no" name = "hostfam" value = "no" />
            <label htmlFor="no"> No </label>
            <br />
            <br />
             { /* UPLOAD ESSAY */ }
            <button >
                <Link href='/essay'> Essay </Link>
                
            </button>
                <button type = "submit" value= "submit" >  Submit</button>
           
        </form>
    </div>  
    </>
    ); 
}; 
export default StudentForm;
