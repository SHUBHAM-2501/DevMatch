const express = require("express");
const requestRouter = express.Router();
const userAuth = require('../middleware/auth');

requestRouter.post("/sendRequest",userAuth, async(req,res)=>{
  res.send("Request sent successfully");
  console.log("Request sent successfully");
})

module.exports = requestRouter;