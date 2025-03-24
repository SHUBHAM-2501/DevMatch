const express = require("express");
const profileRouter = express.Router();
const userAuth = require('../middleware/auth');
const {validateProfileEdits} = require("../utils/validation");

profileRouter.get("/profile",userAuth, async(req,res)=>{
    try{
      const user = req.user;
        res.send(user);
  }catch(err){
    res.send("ERROR :"+err.message);
  }
  });

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
        if(!validateProfileEdits(req)){
            res.status(401).send("Invalid field to update");
        }
        
        const loggedInUser = req.user;
        //res.send("updated  successfully");

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
    
        res.json({message:"updated successfully", data:loggedInUser});


    }catch(err){
      res.status(401).send(err.message);
    }
  });

module.exports = profileRouter;
