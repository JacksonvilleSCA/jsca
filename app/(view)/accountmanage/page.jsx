"use client";
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
//import { accInfo } from "../api/routes/accountInfo";
//import { accUpdate } from "../api/routes/accountUpdate";
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
  const [accData, setAccData] = useState('');
  var firstN;
  var lastN;
  var userN;
  var passW;
  var email;
  var phone;
  


  const searchParams = useSearchParams();
  var search = searchParams.get('myID')


  if(search == null){
    router.push('/login');
    
  }

  
  useEffect(() => {
    loadPage();
  }, []);


  const loadPage = async () =>{

    try{
      const acc = await accInfo(search);
      setAccData(acc);


    } catch (error){
    console.log(error);
    }  


  
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

    }

    console.log(formData);

    try{
      const result = await accUpdate(search,formData);
      alert("Account Update succesful");
      location.reload(true);
    }
    catch(e){
      console.log(e);
    }
    
    //const result = accUpdate(search,formData)
    //.then((response) => response.json())
   // .then((data) => console.log(data));

   // if(result != "wilco"){
     // console.log("Account Update Succesful")
     // alert("Account Update succesful");
      //location.reload(true);
   // }


  }

  function dashB(){

    router.back('/LoginDashboard') 
  }


  firstN = accData.firstname;
  lastN = accData.lastname;
  userN = accData.username;
  passW = accData.password;
  email = accData.email;
  phone = accData.phonenumber;

    return(
      
      <div>

      <h1>Manage Account</h1>
      <button onClick={dashB}> Return </button>

      <br></br>

      <div className={styles.container}>
        <div className={styles.textbox}>
          <form onSubmit={handleSubmit}>
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
  
