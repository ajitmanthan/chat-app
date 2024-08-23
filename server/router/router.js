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
require('../auth/gauth')
const authMiddleware =require('../auth/authMiddleware')


router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
  
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signin', successRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);




router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return res.json({ msg: 'mc bhar sb' })
    } else {
     
     bcrypt.hash(password,12,async function(err,be){
 
const user_id =`user_${Math.floor(Math.random()*100)}`

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
      const token = jweb.sign({ email: email }, secret, { expiresIn: '3d' })
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





router.post('/postmsg',async(req,res)=>{
  try {
   
    const {sender,receiver} = req.body
    data =  new chat({sender,receiver})
    console.log('data: ', data);
    await data.save()
    return res.status(200).json(data)
  } catch (error) {
    console.log('error: ', error);
    
  }
  })

 
  router.get('/getmessage', authMiddleware, async (req, res) => {
    try {
      const userId = req.user_id; 
      console.log(userId);
      
      // Fetch chat messages (example: can filter by userId if needed)
      const data = await chat.find({}); // Adjust query if filtering is needed
      
      return res.status(200).json(data);
    } catch (error) {
      console.log('error: ', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  


module.exports = router
