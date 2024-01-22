"use client"
import React, { useState } from "react"
import styles from './page.module.css'
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { AdminInfo } from '@/app/api/routes/adminInfo';
import Link from "next/link"
import { getAllUsers } from "@/app/api/routes/users"
import { deleteUsers } from "@/app/api/routes/deleteUser"

const AdminUV = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  var search = searchParams.get('myID')
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accData, setAccData] = useState('');


  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers= async () => {
    try {
      const acc = await AdminInfo(search);
      setAccData(acc)
      console.log(acc.AdminID);
      const usersData = await getAllUsers(acc);
      setUsers(usersData);
      setLoading(false);    
    } catch (error) {
      console.error('Error with obtaining data.', error);
      setLoading(false);
    }
  }


  const handleEdit = async(user)=>{
    alert("Edit in progress.");
    const uid = user._id;
    console.log(uid);
    router.push(`/adminEditUser?myID=${search}&ID=${uid}`);

  }
  

  const handleDelete = async (user)=>{
    const confirm = window.confirm(`Are you sure you want to remove this user ${user.firstname} ${user.lastname}?`)
    if(confirm){
      console.log("user is being deleted...");
      try{
        const result = await deleteUsers(user);
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

  function back(){
    router.push(`/adminManage?myID=${search}`)
  }

 


  
 

    return (
      <div>
      <h1>ADMIN OVERVIEW {accData.country}</h1>
      <button onClick={back}>Return</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>User list goes here.</p>
          <ul className={styles.userlist}>
            {users.map((user, index) => (
              <li key={index} className={styles.useritem}>
                <span className={styles.userInfo}>First Name: {user.firstname}, Last Name: {user.lastname}, User Name: {user.username} Country: {user.country}, City: {user.city}</span>
                <button className ={styles.editbutton} onClick = {() =>handleEdit(user)}>Edit</button>
                <button className={styles.deletebutton} onClick={() => handleDelete(user)}>Delete</button></li>
            ))}
          </ul>
        </div>
      )}
    </div>
    )
  }

export default AdminUV