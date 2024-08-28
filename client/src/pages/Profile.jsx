import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Product() {
const userprm = useParams()
const userId = userprm.id
console.log('userId: ', userId);
const [showUser,setShowUser] = useState([])
const User = async (e)=>{
  const response = await axios.get('http://localhost:9999/userProfile',userId)
  setShowUser(response.data)

}



  return (
    <>
    {showUser.map((item,i)=>(
   <div key={i}>
       <div>{item.username}</div>
       <div>{item.email}</div>
       <div>{item.password}</div>
   </div>
    ))} 
    </>
  )
}

export default Product
