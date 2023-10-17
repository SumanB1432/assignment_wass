const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
mongoose.connect(`${process.env.DB_URL}`).then(()=>{
    console.log("Database Is Connected")
}).catch((err)=>{
    console.log(err)
})