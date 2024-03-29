"use client";
import React from 'react';
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {accInfo} from "../../api/routes/accountInfo";
import { accUpdate} from "../../api/routes/accountUpdate"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import NavTwo from "@/app/components/Nav2"




export default function Accountmanage() {
  const router = useRouter();
  const [USER, setUSER] = useState('');
  const [PASSWORD, setPASSWORD] = useState('');
  const [FIRSTN, setFIRSTN] = useState('');
  const [LASTN, setLASTN] = useState('');
  const [EMAIL, setEMAIL] = useState('');
  const [PHONENUMBER, setPHONENUMBER] = useState('');
  const [userCountry, setUserCountry] = useState('')
  const [userState, setUserState] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userStreet, setUserStreet] = useState('');
  const [accData, setAccData] = useState('');
  const [search, setSearch] = useState('');
  var firstN;
  var lastN;
  var userN;
  var passW;
  var email;
  var phone;
  var countRY;
  var staTE;
  var ciTY;
  var strEET;
  const printRef = React.useRef();

  
  


  useEffect(() => {
    const uid = sessionStorage.getItem('uid');
    if (uid == null) {
      router.push('/login');
    }
    else{
      setSearch(uid)
      loadPage(uid);
    }
  }, []);




  const loadPage = async (uid) =>{

    try{
      const acc = await accInfo(uid);
      setAccData(acc);


    } catch (error){
    console.log(error);
    }  


  
  } 

  const handleCountry = (e) =>{
    setUserCountry(e.target.value);
    console.log(userCountry);
  }
  const handleState = (e) =>{
    setUserState(e.target.value);
    console.log(userState);
  }
  const handleCity = (e) =>{
    setUserCity(e.target.value);
    console.log(userCity);
  }

  const handleFirstName = (e) =>{
    setFIRSTN(e.target.value);
    
  }

  const handleLastName = (e) =>{
    setLASTN(e.target.value);
    
  }

  const handleEmail = (e) =>{
    setEMAIL(e.target.value);
    
  }

  const handlePhone = (e) =>{
    setPHONENUMBER(e.target.value);

  }

  const handleUser = (e) =>{
    setUSER(e.target.value);
  }

  const handlePassword = (e) =>{
    setPASSWORD(e.target.value);
  }

  const handleStreet = (e) =>{
    setUserStreet(e.target.value);
  }


  const handleSubmit = async (e,search) => {
    console.log("xxxxx")
    console.log(FIRSTN);
    console.log(LASTN);
    console.log(EMAIL);
    console.log(PHONENUMBER);
    console.log(USER);
    console.log(PASSWORD);
    

    e.preventDefault();
    const formData ={
      firstname: FIRSTN,
      lastname: LASTN,
      email: EMAIL,
      phone: PHONENUMBER,
      username: USER,
      password: PASSWORD,
      country: userCountry,
      state: userState,
      city: userCity,
      street: userStreet

    }
    
    console.log(formData);

    try{
      const UID = sessionStorage.getItem('uid')
      const result = await accUpdate(UID,formData);
      if(result != "wilco"){
        alert("failed to update");
        location.reload(true);
      }
      else{
        alert("Account Update succesful");
        location.reload(true);
      }
    }
    catch(e){
      console.log(e);
    }
    
   


  }

  function dashB(){

    router.back('/LoginDashboard') 
  }

  function printScreen(){
    const confirm = window.confirm("Confirm to download document.")
    if(confirm){
      console.log("Downloading...");
      try{
        const element = printRef.current;
        html2canvas(element).then(canvas => {
          const data = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProperties = pdf.getImageProperties(data);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
          pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('AccountInfo.pdf');
        })
      }
      catch(e){
        alert(e)
      }

      
    }

  }


  firstN = accData.firstname;
  lastN = accData.lastname;
  userN = accData.username;
  passW = accData.password;
  email = accData.email;
  phone = accData.phonenumber;
  countRY = accData.country;
  staTE = accData.state;
  ciTY = accData.city;
  strEET = accData.street;

  return (
    <div>
    <NavTwo/>
    <div ref={printRef} className={styles.pageContainer}>
    
      <div className={styles.title}>
        <h1>|Manage Account</h1>
      </div>
  
      <div className={styles.paddingButton}>
        <button onClick={dashB}> Return </button>
        <button onClick={printScreen}>Export to PDF</button>
      </div>
      
      <div className={styles.Container2}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
          <p>First Name:</p>
          <input
          type="text"
          id="firstName"
          value={FIRSTN}
          onChange={handleFirstName}
          name="firstname"
          placeholder={firstN}
          className={styles.textbox}
          />
          </div>

          <div className={styles.column}>
          <p>Last Name:</p>
          <input
          type="text"
          id="lastName"
          value={LASTN}
          onChange={handleLastName}
          name="lastname"
          placeholder={lastN}
          className={styles.textbox}
          />
          </div>

          <div className={styles.column}>
          <p>Phone Number:</p>
          <input
          type="text"
          id="phonenumber"
          value={PHONENUMBER}
          onChange={handlePhone}
          name="phonenumber"
          placeholder={phone}
          className={styles.textbox}
          />
          </div>
          
        </div>
  
        <div className={styles.row}>
          <div className={styles.column}>
          <p>Country:</p>
          <select name="country" id="country" onChange={handleCountry}>
            <option value="">{countRY}</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Greece">Greece</option>
            <option value="Grenada">Grenada</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Honduras">Honduras</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="South Korea">South Korea</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="North Macedonia">North Macedonia</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestine State">Palestine State</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States of America">United States of America</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
          </div>
          <div className={styles.column}>
          <p>State:</p>
          <input
          type="text"
          id="passWord"
          value={userState}
          onChange={handleState}
          name="passWord"
          placeholder={staTE}
          className={styles.textbox}
          />
          </div>
        </div>
  
        <div className={styles.row}>
          <div className={styles.column}>
          <p>City:</p>
          <input
          type="text"
          id="citY"
          value={userCity}
          onChange={handleCity}
          name="citY"
          placeholder={ciTY}
          className={styles.textbox}
          />
          </div>
          <div className={styles.column}>
          <p>Street:</p>
          <input
          type="text"
          id="streeT"
          value={userStreet}
          onChange={handleStreet}
          name="streeT"
          placeholder={strEET}
          className={styles.textbox}
          />
          </div>
        </div>
  
        <div className={styles.row}>
          <div className={styles.column}>
          <p>User Name:</p>
          <input
          type="text"
          id="userName"
          value={USER}
          onChange={handleUser}
          name="userName"
          placeholder={userN}
          className={styles.textbox}
          />
          </div>
          <div className={styles.column}>
          <p>Password:</p>
          <input
          type="text"
          id="passWord"
          value={PASSWORD}
          onChange={handlePassword}
          name="passWord"
          placeholder={passW}
          className={styles.textbox}
          />
          </div>
          <div className={styles.column}>
          <p>Email:</p>
          <input
          type="text"
          id="email"
          value={EMAIL}
          onChange={handleEmail}
          name="email"
          placeholder={email}
          className={styles.textbox}
          />
          </div>
          
        </div>
        <div className={styles.row + ' ' + styles.centeredButton}>
        <button type="submit" className={styles.textbox3}>Update</button>
        </div>
        
      </form>

      </div>
      
  
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />


      </div>
    </div>



  )
  
}
  