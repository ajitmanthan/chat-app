const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')
const newuser = require('../model/Signup')
const message = require('../model/message')
const chat = require('../model/chat')
const jweb = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = process.env.Secret_code

const authMiddleware =require('../auth/authMiddleware')




router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return res.json({ msg: 'mc bhar sb' })
    } else {
     
     bcrypt.hash(password,12,async function(err,be){
 
const user_id =`user_${Math.floor(Math.random()*1000000)}`

      const data = new newuser({ email, password:be, username,user_id })
      const token = jweb.sign({ email: email }, secret)
      // console.log(token)
      await data.save()
      res.json({ token })
     })
      
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    let data = await newuser.findOne({ email: email })
    if (!data) {
      return res.json({ msg: 'mc sahi se dal details' })
    }
      ismatch = await bcrypt.compare(password,data.password)

    if(ismatch){
      const token = jweb.sign({ email: email,user_id:data.user_id }, secret, { expiresIn: '3d' })
      // console.log(token)
      return res.status(200).json({ token })     
    }else{
      return res.status(400).json({ msg: 'laude sahi password ' })  
    }

  } catch (error) {
    console.log(error)
  }
})

router.get('/getuser',async(req,res)=>{
try {
  data = await newuser.find({})
  return res.status(200).json(data)

} catch (error) {
  console.log('error: ', error);
  
}
})





router.post('/createChat', authMiddleware, async (req, res) => {
  try {
   
    const { sender, receiverId } = req.body;
    const senderId = req.user_id; 

    if (!sender  || !senderId || !receiverId) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    const newChat = new chat({
      sender,
      senderId,
      receiverId
    });


    await newChat.save();

    res.status(201).json({ msg: 'Chat created successfully', chat: newChat });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
});


  router.post('/getmessage', authMiddleware, async (req, res) => {
    try {
      const userId = req.user_id;     
      const receiverId = req.body.receiverId;     
      
      const data = await chat.find({ senderId: userId, receiverId: receiverId }); 
      console.log('data: ',data);
      
      return res.status(200).json(data);
    } catch (error) {
      console.log('error: ', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  


module.exports = router
