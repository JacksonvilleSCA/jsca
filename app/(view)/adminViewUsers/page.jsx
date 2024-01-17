"use client"
import React, { useState } from "react"
import styles from './page.module.css'
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getAllUsers } from "@/app/api/routes/users"
import { deleteUsers } from "@/app/api/routes/deleteUser"

const AdminUV = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  var search = searchParams.get('myID')
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  

  const handleDelete = async (user)=>{
    const confirm = window.confirm(`Are you sure you want to remove this user ${user.firstname} ${user.lastname}?`)
    if(confirm){
      console.log("user is being deleted...");
      try{
        const result = await deleteUsers(user);
       if(result != "wilco"){
        alert("Error, failed ot delete.")
       }
       else{
        alert(result);
        location.reload(true);
       }
      }
      catch(e){
        alert(e);
      }

      
    }
    
  }

  function back(){

    router.back('/adminManage') 

  }

  
 

    return (
      <div>
      <h1>ADMIN OVERVIEW</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>User list goes here.</p>
          <ul className={styles.userlist}>
            {users.map((user, index) => (
              <li key={index} className={styles.useritem}>
                <span className={styles.userInfo}>First Name: {user.firstname}, Last Name: {user.lastname}, User Name: {user.username}</span>
                <button className={styles.deletebutton} onClick={() => handleDelete(user)}>Delete</button></li>
            ))}
          </ul>
        </div>
      )}
    </div>
    )
  }

export default AdminUV