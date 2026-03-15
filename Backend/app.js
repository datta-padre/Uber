const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")
const express = require("express");
const app = express();
const ConnectToDb = require("./DB/Db");
const userRouter = require("./routers/user.routes");

ConnectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.send("Hiiii")
})

module.exports = app;