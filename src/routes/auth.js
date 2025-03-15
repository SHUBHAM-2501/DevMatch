const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res)=>{
  try{ 
    validateSignUpData(req); // validateSignUpData function is called here

    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName ,
    emailId,
    password: passwordHash
  });


    await user.save();
  res.send(user);
  }
  catch(err){
    res.send( "ERROR :" +err.message);
  } 
 });

authRouter.post("/login", async (req, res)=>{
    try{
    const {emailId, password} = req.body;
   
      const user = await User.findOne({emailId:emailId});
      if(!user){
        throw new Error("Invalid credentials");
      }
  
        const isValidPassword = await user.validatePassword(password);
        if(isValidPassword){
  
          //generate the token
          const token = await user.getJWT();
  
          //store the token in the browser
          res.cookie("token", token);
          res.send("Login successful");
      }else{
        throw new Error("Invalid credentials");
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