require('dotenv').config()
const express=require('express')
const app=express()
const mongodb=require("mongodb")
const mongoClient=mongodb.MongoClient

//app.use(express.urlencoded())

const router=express.Router()
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
let port=process.env.PORT   
let host=process.env.HOST  
let url=process.env.MONGODB_URI
let database=process.env.MONGODB_DATABASE
let database_collection=process.env.MONGODB_COLLECTION  




    app.post('/data',(req,res)=>{
        var data=req.body
    
        query={username:data["Username"],password:data["Password"]}

        mongoClient.connect(`${url}`,function(err,db){
            if(err) throw err

            var dbo=db.db(`${database}`)
            query={username:data["Username"]}
            dbo.collection(`${database_collection}`).find(query).toArray(function(err,result){
                if(err)throw err

                if((result[0]["username"]!=data["Username"]) ||    ( result[0]["password"]!=data["Password"])   ) 
                {

                        res.send(false)
            
                        // res.status(204).send();
                }
                else{
       
                    res.send(true)

                }

            })
        })
    })

    app.get("/",(req,res)=>{

            res.sendFile('/technicianLogin.html',{root:__dirname})
    })

    /*app.post("/sign_up",function(req,res){
    console.log(req.body.username)
    
    })*/

    app.get("/",(req,res)=>{
        console.log("link page work")
        res.sendFile('/link.html',{root:__dirname})
    })


    app.use("/",router)

    //module.exports=app

    app.listen(port,host,()=>{
    console.log(`Server listen ${host}:${port}`)
  });