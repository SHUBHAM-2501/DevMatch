require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const http = require("http");

const port = 7777;

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require('./utils/socket');
const chatRouter = require("./routes/chat");


app.use(cors({
  origin: "*",
  credentials:true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter); 
app.use("/", requestRouter);
app.use("/",userRouter);
app.use("/", chatRouter);


app.patch("/user",async(req,res)=>{
  const  userId = req.body.userId;
  try{
    await User.findByIdAndUpdate(userId,req.body,
      {returnDocument: "after",
       runValidators: true,
    });
    res.send("User updated successfully");
  }catch(err){
    res.status(400).send("Error occured");
  }
})

app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{ 
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  }catch(err){
    res.send("Error occured");
  }
})

app.get("/user", async (req,res)=>{
  const userEmail = req.body.emailId;
  try{
  const user = await User.find({emailId: userEmail});
  if(user.length === 0){
    res.status(404).send("user not found");
  }else{
  res.send(user);
    }
  }
catch(err){
  res.send("Error occured");
  }
});

app.get("/feed", async(req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  }
  catch(err){
    res.send("Error occured");
}
});

const Server = http.createServer(app);
initializeSocket(Server);

connectDB().then(
  ()=>{
    console.log("Database connected");
    Server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
)
.catch((err)=>{
  console.log(err);
});
