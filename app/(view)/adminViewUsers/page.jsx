"use client"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getAllUsers } from "@/app/api/routes/users"

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

  



  function back(){

    router.back('/adminManage') 

    
  }

  
 

    return (
      <div>
      <h1>ADMIN OVERVIEW</h1>
      {/* Your other JSX */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>User list goes here.</p>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                Name: {user.username}, Email: {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    )
  }

export default AdminUV