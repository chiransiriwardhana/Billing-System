const express=require('express')
const fileUpload=require('express-fileupload');
const mongodb=require('mongodb');
const fs=require('fs');
const path=require("path");

const app=express();
const router=express.Router()
const mongoClient=mongodb.MongoClient
const binary=mongodb.Binary



router.get("/",(req,res)=>{
  res.sendFile('/tecnician_patient.html',{root:__dirname})
})

router.get("/",(req,res)=>{
  getFile(res);
})
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.use(fileUpload())

router.post("/upload",(req,res)=>{
 let file={file: binary(req.files.uploadedFile.data)}



insertFile(file,res)
})

function insertFile(file,res){
  mongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    if(err){
      return err
    }
    else{
      let db=client.db('uploadDB')
      let collection=db.collection('files')
      try{


        collection.insertOne(file)
        console.log("file inserted");
      }
      catch(err){
        console.log("error while inserting file ",err);
      }

      client.close()
      res.redirect('/')


    }

  })

}





function getFiles(res){

  mongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    if(err){
      return err
    }
    else{
      let db=client.db('uploadDB')
      let collection=db.collection('files')
      collection.find({}).toArray((err,doc)=>{
        if(err){
          console.log("error in finding doc: ",err)
        }
        else{
          let buffer=doc[0].file.buffer
          fs.writeFileSync('uploadedImage.jpg',buffer)
        }
      })

      client.close()
      res.redirect('/')


    }

  })
}




app.use("/",router)
app.listen(7000,()=>console.log("Started on port 7000"))
