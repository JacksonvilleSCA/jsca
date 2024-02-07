"use client";
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import {accInfo} from "../../api/routes/accountInfo";
import { accUpdate} from "../../api/routes/accountUpdate"



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
  const [userCity, setUserCity] = useState('')
  const [accData, setAccData] = useState('');
  const [search, setSearch] = useState('')
  const [adminID, setAdminID] = useState('')
  var firstN;
  var lastN;
  var userN;
  var passW;
  var email;
  var phone;
  var countRY;
  var staTE;
  var ciTY;
  

  
  useEffect(() => {
    const searcH = sessionStorage.getItem('uid')
    const adminid = sessionStorage.getItem('AID')
    if(searcH == null){
      router.push('/login');
    }
    else{
      setSearch(searcH)
      setAdminID(adminid)
      loadPage(searcH);
    }
  }, []);


  const loadPage = async (searcH) =>{

    try{
      const acc = await accInfo(searcH);
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


  const handleSubmit = async (e) => {
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

    }

    console.log(formData);

    try{
      const result = await accUpdate(search,formData);
      if(result != "wilco"){
        alert("failed to update");
        location.reload(true);

      }
      else{
        alert("Account Update succesful");
        sessionStorage.removeItem('uid');
        router.push('/adminViewUsers')
      }
    }
    catch(e){
      console.log(e);
    }


    

  }

  function dashB(){

    router.back('/adminViewUsers') 
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

    return(
      
      <div>

      <h1>Admin Edit by {adminID}</h1>
      <button onClick={dashB}>Return</button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className={styles.container}>
        <div className={styles.textbox}>
    
          <form onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <h2>User ID: {search}</h2>
            <p>First Name:</p>
            <p></p>
            <input className={styles.textbox} type="text" id="firstName" 
            value ={FIRSTN} onChange={handleFirstName} name ="firstname" placeholder={firstN}/>
            <p>Last Name: </p>
            <input className={styles.textbox} type="text" id="lastName" 
            value={LASTN} onChange={handleLastName} name="lastname" placeholder={lastN} />
            <p>Email: </p>
            <input className={styles.textbox} type="text" id="email" 
            value={EMAIL} onChange={handleEmail} name="email" placeholder={email} />
            <p>Phone Number: </p>
            <input className={styles.textbox} type="text" id="phonenumber"
            value={PHONENUMBER} onChange={handlePhone} name="phonenumber" placeholder={phone}/>

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

            <p>City:</p>
            <input className={styles.textbox} type="text" id="citY"
            value={userCity} onChange={handleCity} name="citY" placeholder={ciTY}/>

            <p>State:</p>
            <input className={styles.textbox} type="text" id="passWord"
            value={userState} onChange={handleState} name="passWord" placeholder={staTE}/>

            <p>User Name: </p>
            <input className={styles.textbox} type="text" id="userName"
            value={USER} onChange={handleUser} name="userName" placeholder={userN}/>
            
            <p>Password:</p>
            <input className={styles.textbox} type="text" id="passWord"
            value={PASSWORD} onChange={handlePassword} name="passWord" placeholder={passW}/>
            <br></br>
            <br></br>
            <br></br>

            <button type="submit" className={styles.textbox3}>Update</button>
            <br>
            </br>
            <br></br>
            </form>

        </div>
        <div>
          <br></br>
          <br></br>
        </div>


      </div>
      

      


  
      </div>
    )
  }
  
