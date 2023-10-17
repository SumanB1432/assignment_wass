const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:String,
        

    },
    category:{
        type:String,
       

    },

    company:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("items",itemSchema)