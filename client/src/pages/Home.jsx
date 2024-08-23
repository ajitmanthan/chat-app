import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {

  const [user, setuser] = useState([])
  const userdata = async (e) => {
    try {
      const response = await axios.get('http://localhost:9999/getuser')
      setuser(response.data)

    } catch (error) {
      console.log('error: ', error);
    }
  }
  useEffect(() => {
    userdata()
  }, [])


  const chatshow = (e) => {

  }

  // ###################### msg send ###########
  const [mssg, setMssg] = useState('')
  const chatsend = async (e) => {
    e.preventDefault()

    const response = await axios.post('http://localhost:9999/postmsg', { sender: mssg, receiver: mssg })
    console.log('response: ', response);

  }



// ###########################  msg get #########################
const [message, setmessage] = useState([])
const messagedata = async (e) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:9999/getmessage',{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setmessage(response.data)

  } catch (error) {
    console.log('error: ', error);
  }
}
useEffect(() => {
  messagedata()
}, [])


  return (
    <>
      <div style={{ display: 'flex' }}>
        <ul>
          {user.map((item, index) => (
            <li style={{ border: '1px solid black', width: '30vw', height: '60px', listStyle: 'none' }} key={index} onClick={chatshow}>{item.email}</li>
          ))}
        </ul>

        <div className="chatbody" style={{ position: 'relative' }}>
          <div className="chatuser"></div>
          <div className="chatbox" style={{ border: '1px solid black', width: '60vw', height: '90vh' }}></div>
          <div className="chatsend">

            <input
              type="text"
              name="mssg"
              value={mssg}
              id="mssg"
              style={{ width: '40vw', height: '4vh' }}
              onChange={(e) => setMssg(e.target.value)}
            />

            <button type="submit"
              onClick={chatsend}
              style={{ width: '10vw', height: '4vh' }}>send</button>

          </div>

        </div>

      </div>




    </>
  )
}

export default Home
