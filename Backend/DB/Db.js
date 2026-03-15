const mongoose = require("mongoose");

function ConnectToDb(){

    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connect Database");
    }catch(err){
        console.log(err)
    }

}

module.exports = ConnectToDb;