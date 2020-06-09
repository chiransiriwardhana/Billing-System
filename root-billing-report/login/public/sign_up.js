const express=require('express')
const app=express()
const mongodb=require("mongodb")
const mongoClient=mongodb.MongoClient


const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.post("/signUp",function(req,res){
    res.send(req.body)
    res.status(204).send()
})

app.get("/",(req,res)=>{
    console.log("link page work")
    res.sendFile('/link.html',{root:__dirname})
})





