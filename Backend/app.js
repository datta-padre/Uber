const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")
const express = require("express");
const app = express();
const ConnectToDb = require("./DB/Db");
const userRouter = require("./routers/user.routes");
const captainRouter = require("./routers/captain.routes");
const cookieparser = require("cookie-parser");

ConnectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.use("/users",userRouter);
app.use("/captains",captainRouter)

app.get("/",(req,res)=>{
    res.send("Hiiii")
})

module.exports = app;