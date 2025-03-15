const express = require("express");
const profileRouter = express.Router();
const userAuth = require('../middleware/auth');
const {validateProfileEdits} = require("../utils/validation");

profileRouter.get("/profile",userAuth, async(req,res)=>{
    try{
      const user = req.user;
        res.send(user);
        console.log(user);
  }catch(err){
    res.send("ERROR :"+err.message);
  }
  });

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
        if(!validateProfileEdits(req)){
            throw new Error ("Invalid edit fields");
        }
        
        const loggedInUser = req.user;
        console.log(loggedInUser);
        //res.send("updated  successfully");

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
    
        res.json({message:"updated successfully", data:loggedInUser});


    }catch(err){
        res.send("ERROR :"+err.message);
    }
  });

module.exports = profileRouter;
