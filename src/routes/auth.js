const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res)=>{
  try{ 
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName ,
    emailId,
    password: passwordHash
  });

  const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User Added successfully!", data: savedUser });
    
  }
  catch(err){
    res.status(400).send("ERROR : " + err.message);
  } 
 });

authRouter.post("/login", async (req, res)=>{
    try{
    const {emailId, password} = req.body;
   
      const user = await User.findOne({emailId:emailId});
      if(!user){
       res.status(401).send("Invalid credentials");
      }
  
        const isValidPassword = await user.validatePassword(password);
        if(isValidPassword){
  
          const token = await user.getJWT();
  
          res.cookie("token", token);
          res.send(user);
      }else{
        res.status(401).send("Invalid credentials");
    }
    }catch(err){
      res.send("ERROR :"+err.message);
    }
  });

authRouter.post("/logout", async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date (Date.now()),
    });
    res.send("logout successfull");
});

module.exports = authRouter;