import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState([]);
  const [mssg, setMssg] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userdata = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:9999/getuser');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userdata();
  }, []);

  const chatshow = async (e) => {
    try {
      const token = localStorage.getItem('token');
      const receiver = e.target.id;
  
      setSelectedUserId(receiver);
      
      const response = await axios.post(
        'http://localhost:9999/getmessage',
        { receiverId: receiver },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('response.data: ', response.data);
  
      // Collect all messages from all chat documents
      const allMessages = response.data.flatMap(chat => chat.messages);
  
      setMessage(allMessages);
    } catch (error) {
      console.log('Error fetching messages: ', error);
    }
  };
  

  const chatsend = async (e) => {
    e.preventDefault();
  
    if (selectedUserId) {
      try {
        const token = localStorage.getItem('token');
  
        const response = await axios.post(
          'http://localhost:9999/createChat',
          {
            content: mssg,
            receiverId: selectedUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const updatedMessages = response.data.chat.messages;
        setMessage(updatedMessages);
        setMssg('');
      } catch (error) {
        console.log('Error sending message: ', error);
        alert('Failed to send message. Please try again.');
      }
    } else {
      alert('Please select a user to chat with.');
    }
  };
  console.log(message,'messagemessagemessagemessage');
  

  return (
    <>
      <div style={{ display: 'flex' }}>
        <ul>
          {loading ? (
            <li>Loading...</li>
          ) : error ? (
            <li>{error}</li>
          ) : (
            user.map((item) => (
              <li
                style={{ border: '1px solid black', width: '30vw', height: '60px', listStyle: 'none' }}
                key={item.user_id}
                id={item.user_id}
                onClick={chatshow}
              >
                {item.email}
              </li>
            ))
          )}
        </ul>

        <div className="chatbody" style={{ position: 'relative' }}>
          <div className="chatuser"></div>
          <div className="chatbox" style={{ border: '1px solid black', width: '60vw', height: '90vh', overflowY: 'auto' }}>
            {message.map((mg, i) => (
              <div key={i}>
                {mg.senderId}
                <div style={{ backgroundColor: 'grey', margin: '4px', padding: '10px', borderRadius: '10px', color: 'white' }}>
                 {mg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="chatsend">
            <input
              type="text"
              name="mssg"
              value={mssg}
              id="mssg"
              style={{ width: '40vw', height: '4vh' }}
              onChange={(e) => setMssg(e.target.value)}
            />
            <button
              type="submit"
              onClick={chatsend}
              style={{ width: '10vw', height: '4vh' }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
