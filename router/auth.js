const express = require("express");
const router = express.Router()
const User = require("../db/userSchema")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authentication = require("../MiddleWare/Authentication")
const nodemailer = require("nodemailer");

    
router.get("/about" , Authentication , (req , res) => {
    res.send(req.trueUser)   
})

router.get("/contact" , Authentication ,  (req,res) => {
    res.send(req.trueUser)
})

router.post("/contact" , Authentication , async (req  , res) =>{
    const {name , email , mno , message} = req.body
    
    try {
        if (!name || !email || !mno || !message) {
            res.status(401).json({ message: "Fill the form first" })
        }
        const date = Date.now()

        const MessageStored = await req.trueUser.addMessage(name, email, mno, message, date);

        if (!MessageStored) {
            res.status(401).json({ message: "Message Not Sent" })
        } else {
            res.status(200).json({ message: "Message Sent" })
        }

    } catch (error) {
        
    }
})


router.get("/log-in" , (req,res) => {
    res.send("Thsi is log-in page");
})

router.post("/log-in" , async (req,res) => {
    try {
        
        const { email , password } = req.body;

        if(!email || !password){
            return res.status(422).json({message:"Enter email or password"})
        }
    
        const correctInfo = await User.findOne({email : email});
  
        const passmatch = await bcrypt.compare(password , correctInfo.password)
          
        if(!correctInfo || !passmatch){
            res.status(422).json({message:"Login Fail : Enter Valid email or password"})         
        }
        
        if(passmatch){
            const token = await correctInfo.generateToken();
            res.cookie("jwtoken", token , {
                expires: new Date(Date.now() + 86400000 ),
                httpOnly:true          
        });
    
            return res.status(200).json({message:"login successfull",name:correctInfo.name})    

        }
                
    }catch (error) {
        return res.status(422).json({message:"Login Fail : Enter Valid email or password"})
    }
     
});

router.get("/logout", (req,res)=>{
    res.clearCookie('jwtoken' , { path:"/" })
    res.status(200).send("Logout")

})


// ---------------------STORING DATA USING Async-Await ------------------------------
router.post("/regester" , async (req,res) => {
    const { name , email , mno , profession , password , cpassword } = req.body ;
    
    try {
         
        const userExist = await User.findOne({email:email})
     
        if(userExist){
            return res.status(422).json({message:"User already Regestred"})
            
        }else if( !name || !email || !mno || !profession || !password || !cpassword){
            return res.status(422).json({message:"Fill the form Properly"})
        }else if( password != cpassword){
            return res.status(422).json({message:"Keep same Passwords"})
            
        }else{
            const newUser = new User({
                name : name,
                email : email,
                mno : mno,
                profession : profession,
                password : password,
                cpassword : cpassword
            })
            
            // (Middlewere here)
            
            // Saving Data 
            const save = await newUser.save()
            if(!save){
                return res.status(200).json({message:"Regestration fail"})
            } else {
                
                return res.status(200).json({message:"Regestration Successfull",name:name})
            }
        }
    } catch (error) {
   
    }

})


router.post("/changePro", Authentication, async (req, res) => {
    
    const { name, email, mno, profession } = req.body
    
    try {
        const changePro = await req.trueUser.ChangePro(name, email, mno, profession);

        if (!changePro) {
            res.status(401).send("Can't change Profile")
        } else {
            res.status(200).send("Profile Changed")
        }

    } catch (error) {
        
    }

})


module.exports = router;


