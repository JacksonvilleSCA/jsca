"use client"
import React, { useState } from "react"
import styles from './page.module.css'
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { AdminInfo } from '@/app/api/routes/adminInfo';
import Link from "next/link"
import { getAllAdmins } from "@/app/api/routes/admins"
import { deleteAdmins } from "@/app/api/routes/deleteAdmin"
import { DownloadAllAdmins } from "@/app/api/routes/downloadAllAdmins"
import NavThree from "@/app/components/Nav3"

const AdminAV = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accData, setAccData] = useState('');
  const [search, setSearch] = useState(null);
  const [filter, setFilter] = useState('');
  const showCreate = search && !search.includes('j');

  const router = useRouter();
  useEffect(() => {
    const searcH = sessionStorage.getItem('AID');
    if (searcH == null) {
      router.push('/login');
    }
    else {
      setSearch(searcH);
      fetchUsers(searcH);
    }
    
  },[]);






  const fetchUsers= async (search) => {
    try {
      const acc = await AdminInfo(search);
      setAccData(acc)
      console.log(acc.AdminID);
      const usersData = await getAllAdmins(acc);
      setUsers(usersData);
      setLoading(false);    
    } catch (error) {
      console.error('Error with obtaining data.', error);
      setLoading(false);
    }
  }


  const handleEdit = async(user)=>{
    alert("Edit in progress.");
    const uid = user.adminID;
    console.log(uid);
    sessionStorage.setItem('uid', uid);
    router.push('/adminEditAdmin');

  }
  

  const handleDelete = async (user)=>{
    const confirm = window.confirm(`Are you sure you want to remove this Admin ${user.firstname} ${user.lastname}?`)
    if(confirm){
      console.log("Admin is being deleted...");
      try{
        const result = await deleteAdmins(user);
       if(result != "wilco"){
        alert("Error, failed to delete.")
       }
       else{
        alert(result);
        location.reload(true);
       }
      }
      catch(error){
        alert(error);
      }

      
    }
    
  }


  const handleDownload = async(search) =>{ 
    try{
      const {headers, csvContent} = await DownloadAllAdmins(search);
      console.log(headers)
      console.log(csvContent)
      
      if(headers == null || csvContent == null){
        alert("Error with download.")
      }
      else{
        const csvData = `${headers}\n${csvContent}`;
            
        const blob = new Blob([csvData], { type: 'text/csv' });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Admins.csv';

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

      }
    }
    catch(e){
      console.log(e)
    }
    
    
  }

  function back(){
    router.push('/admindashboard')
  }


  function handleSearchReset(){
    location.reload(true);
  }

  const handleSearch = () =>{
    const removeSpace = filter.replace(/\s/g, "") 
    setFilter(removeSpace)
    const users1 = users.filter(user => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase()
      const userNAME = user.username.toLowerCase().replace(/\s/g, "") 
      const city = user.city.toLowerCase().replace(/\s/g, "") 
      const country = user.country.toLowerCase().replace(/\s/g, "") 
      return fullName.includes(removeSpace.toLowerCase()) || userNAME.includes(removeSpace.toLowerCase())
      || city.includes(removeSpace.toLowerCase()) || country.includes(removeSpace.toLowerCase());
    });
    setUsers(users1);
  }

 


  
 

    return (
      <div>
      <NavThree/>
      <h1>|ADMIN OVERVIEW </h1>
      <div className={styles.topContainer}>
        {showCreate && (
            <Link href='/adminCreate'>Admin Creation</Link>
          )
        }
        <p>|</p>
        <Link href='/adminStudent'>Student Account Creation</Link>
        <p>|</p>


      </div>
      

      
      <br></br>
      <div className={styles.paddingButton}>
      <button  onClick={back}>Return</button>
      <button onClick={() => handleDownload(accData)}>Download Admin Data</button>



      </div>
      

      <br></br>
     
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          {users.length == 0? (
            <div>
            <p>No users found.
            Incase of errors thought, check account details for misspelled city names or contact an admin for support.</p>
            <button onClick={handleSearchReset}>Reset</button>
            </div>
            
          ) : ( 
          <ul className={styles.userlist}>
            <h1 className={styles.title}>Database Admins</h1>
            <div className={styles.title}>
              <input type="text"
              placeholder="ex.(Keith David)"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}/>
              <button className={styles.resetButton} onClick={handleSearch}>Search</button>
              <button onClick={handleSearchReset}>Reset</button>
              <p className={styles.tagP}>Input must be reset after each search.</p>
            </div>

            <br></br>
            <br></br>
            {users.map((user, index) => (
              <li key={index} className={`${styles.useritem} ${index % 2 === 0 ? styles.darkblue : styles.lightblue}`}>
                <div className={styles.userInfo}>
                <div className={styles.userDetail}>
                <span>First Name: </span>
                <span>{user.firstname}</span>
                </div>
                <div className={styles.userDetail}>
                <span>Last Name: </span>
                <span>{user.lastname}</span>
                </div>
                <div className={styles.userDetail}>
                <span>User Name: </span>
                <span>{user.username}</span>
                </div>
                <div className={styles.userDetail}>
                <span>Country: </span>
                <span>{user.country}</span>
                </div>
                <div className={styles.userDetail}>
                <span>City: </span>
                <span>{user.city}</span>
                </div>
                </div>

                <div className={styles.buttons}>
                <button className={styles.editbutton} onClick = {() =>handleEdit(user)}>Edit</button>
                <button className={styles.deletebutton} onClick={() => handleDelete(user)}>Delete</button>
                </div>
              
                
              </li>
             
              
            ))}
          </ul>
          )}
        </div>
      )}
    </div>
    )
  }

export default AdminAV