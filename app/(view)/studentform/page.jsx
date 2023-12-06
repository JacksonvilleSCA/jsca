import React from 'react';
import Link from 'next/link'; 
import essay from '../essay/page';
import { POST } from '@/app/api/routes/essayroutes'; 

 const StudentForm = () => {
  
  return (
    <>
    <h1 id="title">
                Jacksonville Sister Cities  Landon Middle Student Exchange Program Application Form</h1>
            <h1 id="Section1">Section I: Student's Legal Name, Contact Data and Information (Do not use nicknames)</h1>

            <form action={POST}>
            <label>
                Last/Family Name:
                <input type="text" name="text" id="text" />
            </label>
            <br /> <br />
            <label>
             {" "}
                First/Given Name:
                <input type="text" name="text" id="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Middle Name:
                <input type="text" name="text" id="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Perferred Name:
                <input type="text" name="text" id="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Student Phone Number:
                <input
                    type="tel"
                    name="telephone"
                    pattern="[0-0]{3}-[0-9]{3}-[0-9]{4}"
                    required="" />
            </label>
            <br />
            <br />
            <label> Sex at Birth </label>
            <input type="radio" id="male" />
            <label htmlFor="male"> Male </label>
            <input type="radio" id="female" />
            <label htmlFor="female"> Female </label>
            <br /> <br />
            <label>
                {" "}
                Date of Birth
                <input type="date" />
            </label>
            <br /> <br />
            <label> School: </label>
            <br />
            <br />
            <input type="radio" id="JWJCP" />
            <label htmlFor="JWJCP"> James Weldon Johnson College Prep </label>
            <br />
            <br />
            <input type="radio" id="JLCP" />
            <label htmlFor="JLCP"> Julia Landon College Prep </label>
            <br />
            <br />
            <input type="radio" id="other" />
            <label htmlFor="other">
                {" "}
                Other <input type="text" name="text" />{" "}
            </label>
            <br />
            <br />
            <label> Current Grade Level: </label>
            <br />
            <br />
            <input type="radio" id={6} />
            <label htmlFor={6}> 6th </label>
            <input type="radio" id={7} />
            <label htmlFor={7}> 7th </label>
            <input type="radio" id={8} />
            <label htmlFor={8}> 8th </label>
            <input type="radio" id="other" />
            <label htmlFor="other">
                {" "}
                Other: <input type="text" name="text" />{" "}
            </label>
            <br />
            <br />
            <label> Select Program(s) of Interest: </label>
            <br />
            <br />
            <input type="radio" id="SouthA" />
            <label htmlFor="SouthA"> South Africa </label>
            <br />
            <br />
            <input type="radio" id="SouthK" />
            <label htmlFor="SouthK"> South Korea </label>
            <br />
            <br />
            <input type="radio" id="PR" />
            <label htmlFor="PR"> Puerto Rico </label>
            <br />
            <br />
            <label> Do you have a passport? </label>
            <input type="radio" id="yes" />
            <label htmlFor="yes"> Yes </label>
            <input type="radio" id="no" />
            <label htmlFor="no"> No </label>
            <br />
            <br />
            <label>
                {" "}
                List passport country:
                <input type="text" name="text" />
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
                <input type="date" />
            </label>
            <br />
            <br />
            <label> Allergies and Dietary Restrictions: </label>
            <br />
            <br />
            <textarea name="text" id="textbox" rows={13} cols={63} defaultValue={" "} />
            <br />
            <br />
            <h1>Section II: Parent's Name, Address and Contract Data</h1>
            <br />
            <br />
            <label>
                {" "}
                First/Last Name of Parent 1:
                <input type="text" name="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                First/Last Name of Parent 2:
                <input type="text" name="text" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Street Number and Street
                <input type="text" name="text" />
            </label>
            <br />
            <br />
            <label>
                City:
                <input type="text" name="text" />
            </label>
            <br />
            <br />
            <label id="state"> State </label>
            <select name="state" size={1}>
                <option value="Select State"> Select State </option>
                <option value="Alabama"> Alabama </option>
                <option value="Alaska"> Alaska </option>
                <option value="Arizona"> Arizona </option>
                <option value="Arkansas"> Arkansas </option>
                <option value="California"> California </option>
                <option value="Colorado"> Colorado </option>
                <option value="Connecticut"> Connecticut </option>
                <option value="Delaware"> Delaware </option>
                <option value="Florida"> Florida </option>
                <option value="Georgia"> Georgia </option>
                <option value=" Hawaii"> Hawaii </option>
                <option value="Idaho"> Idaho </option>
                <option value="Illinois"> Illinois </option>
                <option value="Indiana"> Indiana </option>
                <option value="Iowa"> Iowa </option>
                <option value="Kansas"> Kansas </option>
                <option value="Kentucky"> Kentucky </option>
                <option value="Louisiana"> Louisiana </option>
                <option value="Maine"> Maine </option>
                <option value="Maryland"> Maryland </option>
                <option value="Massachusetts"> Massachusetts </option>
                <option value="Michigan"> Michigan </option>
                <option value="Minnesota"> Minnesota </option>
                <option value="Mississippi"> Mississippi </option>
                <option value="Missouri"> Missouri </option>
                <option value="Montana"> Montana </option>
                <option value="Nebraska"> Nebraska </option>
                <option value="Nevada"> Nevada </option>
                <option value="New Hampshire"> New Hampshire </option>
                <option value="New jersey"> New Jersey </option>
                <option value="New Mexico"> New Mexico </option>
                <option value="New York"> New York </option>
                <option value="North Carolina"> North Carolina </option>
                <option value="North Dakota"> North Dakota </option>
                <option value="Ohio"> Ohio </option>
                <option value="Oklahoma"> Oklahoma </option>
                <option value="Oregon"> Oregon </option>
                <option value="Pennsylvania"> Pennsylvania </option>
                <option value="Rhode Island"> Rhode Island </option>
                <option value="South Carolina"> South Carolina </option>
                <option value="South Dakota"> South Dakota </option>
                <option value="Tennessee"> Tennessee </option>
                <option value="Texas"> Texas </option>
                <option value="Utah"> Utah </option>
                <option value="Vermont"> Vermont </option>
                <option value="Virginia"> Virginia </option>
                <option value="Washington"> Washington </option>
                <option value="West Virginia"> West Virginia </option>
                <option value="Wisconsin"> Wisconsin </option>
                <option value="Wyoming"> Wyoming </option>
            </select>
            <br /> <br />
            <label>
                Zip Code:
                <input type="number" name="quantity" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Parent 1's Phone Number:
                <input
                    type="tel"
                    name="telephone"
                    pattern="[0-0]{3}-[0-9]{3}-[0-9]{4}"
                    required="" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Parent 2's Phone Number:
                <input
                    type="tel"
                    name="telephone"
                    pattern="[0-0]{3}-[0-9]{3}-[0-9]{4}"
                    required="" />
            </label>
            <br />
            <br />
            <label>
                {" "}
                Primary E-mail:
                <input type="email" name="mail" id="mail" />
            </label>
            <br />
            <br />
  //PARENT SIGNATURE
            <br />
            <br />
            <label>
                {" "}
                Date <input type="date" />{" "}
            </label>
            <br />
            <br />
            <label>
                {" "}
                Parent's Printed Name:
                <input type="text" name="text" />
            </label>
            <br />
            <br />
            <h1>Section III: Student Exchange Host & Travel Interest</h1>
            <input type="radio" id="HostandTravel" />
            <label htmlFor="HostandTravel"> Host Family* and Travel </label>
            <input type="radio" id="Host" />
            <label htmlFor="Host"> Host Family* Only </label>
            <input type="radio" id="Travel" />
            <label htmlFor="Travel"> Travel Only </label>
            <br />
            <br />
            <label>*Host a second family (if needed) </label>
            <input type="radio" id="yes" />
            <label htmlFor="yes"> Yes </label>
            <input type="radio" id="yes" />
            <label htmlFor="no"> No </label>
            <br />
            <br />
             {/* UPLOAD ESSAY */}
            <button >
                <Link href='/essay'> essay </Link>
            </button>
             {/* <link href='/essay'>essay</Link> */}
           
        </form>
    </>
    ); 
}; 
export default StudentForm;
