import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {

  const [user, setuser] = useState([])
  const [message, setmessage] = useState([])
  const [mssg, setMssg] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null);
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


  const chatshow = async(e) => {
    try {
      const token = localStorage.getItem('token')
     const receiver = e.target.id
     setSelectedUserId(receiver);
      const response = await axios.post('http://localhost:9999/getmessage',{receiverId:receiver},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setmessage(response.data)
  
    } catch (error) {
      console.log('error: ', error);
    }

  }

  // ###################### msg send ###########

  const chatsend = async (e) => {
    e.preventDefault();
  
    if (selectedUserId) {
      try {
        const token = localStorage.getItem('token');
  
        const response = await axios.post(
          'http://localhost:9999/createChat',
          {
            sender: mssg,
            receiver: mssg,
            receiverId: selectedUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log('response: ', response);
  
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setMssg('');
      } catch (error) {
        console.log('error sending message: ', error);
      }
    } else {
      alert('Please select a user to chat with.');
    }
  };
  

// ###########################  msg get #########################

// const messagedata = async (e) => {

// }
// useEffect(() => {
//   messagedata()
// }, [])


  return (
    <>
      <div style={{ display: 'flex' }}>
        <ul>
          {user.map((item, index) => (
            <li style={{ border: '1px solid black', width: '30vw', height: '60px', listStyle: 'none' }} key={item.user_id} id={item.user_id} onClick={chatshow}>{item.email}</li>
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
