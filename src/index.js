const express = require("express");
const cors = require("cors");
const app = express();
const dotnev = require("dotenv").config();
require("../db/config");
const item = require("../db/item");

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("app is working")
})

app.post("/POST/api/items",async(req,res)=>{
    try {
        let data = req.body;
        console.log(data)
        if(!data){
            res.status(400).send("Please provide Items details!")
        }
        let insertItem = await item.create(data);
        if(insertItem){
            console.log("hello")
            res.status(201).send("Item Created Successfully")
        }
        else{
            res.status(400).send("Something Wrong!")
        }
    } catch (error) {
        if(error){
            res.status(500).send("Internal Server Error!")
        }

    }
})


app.get("/GET/api/items",async (req,res)=>{
    try {
        let items = await item.find();
        if(items.length>0){
            return res.status(200).send(items)
        }
        else{
            return res.status(404).send({result:'no result found'})
        }
        
    } catch (error) {
        return res.status(500).send(error)
        
    }
})


app.delete("/DELETE/api/items/:id",async(req,res)=>{
    try{
    let id = req.params.id;
    const result = await item.deleteOne({_id:id});
    return res.status(200).send(result)
    }
    catch(err){
        return res.status(500).send({status:false,message:err})
    }

})
app.put("/PUT/api/items/:id",async (req, resp) => {
    try{
    let result = await item.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    return resp.status(200).send(result)
    }
    catch(err){
        return resp.status(500).send({status:false,message:err})
    }
});

app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`SERVER RUN ON ${process.env.PORT}`)
    }


})