import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Product() {
const userprm = useParams()
const userId = userprm.id
const [showUser,setShowUser] = useState([])
const User = async (e)=>{
  const response = await axios.get('http://localhost:9999/userProfile',userId)
  console.log('response: ', response);
  setShowUser(response.data)

}
useEffect(()=>{
User()
},[])


  return (
    <>
   
   <div>
    
       <div>UserName : {showUser.username}</div>
       <div>Email : {showUser.email}</div>

   </div>
    </>
  )
}

export default Product
