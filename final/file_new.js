const express=require('express')
const fileUpload=require('express-fileupload');
const mongodb=require('mongodb');
const fs=require('fs');
const path=require("path");
//var alert=require('sweetalert');
const mongoose=require('mongoose')
const app=express();
const router=express.Router()
const mongoClient=mongodb.MongoClient
const binary=mongodb.Binary

var fullname=[];
var query;

/*
router.get("/selected",function(req,res){
  fullname=req.query.patient_info;
  Return_name();
  res.status(204).send();
})

function Return_name(){
  return fullname;
}

*/




router.get('/search',function(req,res){

  mongoClient.connect('mongodb://localhost:27017/billing_final', function(err, db) {
  if (err) throw err;
  var dbo = db.db("billing_final");



  console.log(objectValue)
//  var objectValue = JSON.parse(objectValue);
  var spawn = require('child_process').spawn,
  py    = spawn('python', ['rsa_encryption.py']),
  data=  [objectValue['patient_info']],
 str_list=[];


 py.stdout.on('data', function(data){
    str_data=data.toString();
    console.log('str_data')
    console.log(str_data)
    str_list = str_data.split("\n");
    console.log("**********")
    console.log(str_data.split("\n"));
  });


 py.stdout.on('end', function(){
 objectValue['firstName']=str_list[0];
 objectValue['surname']=str_list[1];
 fullName[0]=  objectValue['firstName'];
 fullName[1]=  objectValue['surname'];

 query={firstName:fullName[0],surname:fullName[1]}


  dbo.collection("activities").find(query).toArray(function(err, result) {
  if (err) throw err;

  res.send( {first_name:result[0].firstName,second_name:result[0].surname});
  console.log(first_name).js
  db.close();

});

});
});
});





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
app.listen(3000,()=>console.log("Started on port 3000"))
