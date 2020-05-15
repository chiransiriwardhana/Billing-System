const express=require('express')
const fileUpload=require('express-fileupload');
const mongodb=require('mongodb');
const fs=require('fs');
const path=require("path");
//var alert=require('sweetalert');
const app=express();
const router=express.Router()
const mongoClient=mongodb.MongoClient
const binary=mongodb.Binary
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*

function decrypt_info(re,res)
{
   encrypt_data_list=[]
  // encrypt_data_list=Object.values(re)
  // console.log(re)

  console.log("re")
  console.log(re)
   var spawn=require("child_process").spawn,
   process=spawn('python',["rsa_decryption.py"]),
   data =[re["address"],re["surname"]],
   dataString="";
 
  
 
   process.stdout.on('data',function(data){
 
     dataString+=data.toString()
     
   });
   process.stdout.on('end',function(){
     
    //return dataString
     res.send(dataString)
     //console.log(dataString)
   })
 
   process.stdin.write(JSON.stringify(data));
   process.stdin.end();

}*/



router.post('/search',function(req,res){


    mongoClient.connect('mongodb://localhost:27017/billing_final', function(err, db) {
      if (err) throw err;
      var dbo = db.db("billing_final");
     

  
      query={_id:9}
       
      dbo.collection("activities").find(query).toArray(function(err, result) {
        if (err) throw err;

        console.log(result[0])

        var spawn=require("child_process").spawn,
        process=spawn('python',["rsa_decryption.py"]),
        data =[result[0]["surname"],result[0]["city"],result[0]["address"],result[0]["e_mail"]];
    
   
     
       

        process.stdout.on('data',function(data){
          
          
         dataString=data.toString()
         str_list=dataString.split("\n")
         console.log(str_list)
        
        });
        process.stdout.on('end',function(){
       
        res.send(str_list)
    
        })
      
        process.stdin.write(JSON.stringify(data));
        process.stdin.end();
        db.close();
  
      });
    });

})



















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
app.listen(8000,()=>console.log("Started on port 8000"))
