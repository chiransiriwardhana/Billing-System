require('dotenv').config()
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
let port=process.env.PORT;
let host=process.env.host;
let database_url=process.env.MONGODB_URI
let database_=process.env.MONGODB_DATABASE
let database_collection=process.env.MONGODB_COLLECTION
let report_database=process.env.MONGODB_REPORT_DATABASE
let report_collection=process.env.MONGODB_REPORT_COLLECTION
let mongodb_main_uri=process.env.MONGODB_MAIN_URI
var id;


router.post('/search',function(req,res){

  
    mongoClient.connect(`${database_url}`, function(err, db) {
      if (err) throw err;
      var dbo = db.db(`${database_}`);
      
      query={_id:parseInt(req.body.patient_info)}
       
      dbo.collection(`${database_collection}`).find(query).toArray(function(err, result) {
        if (err) throw err;

        if(JSON.stringify(result)!="[]"){

        var spawn=require("child_process").spawn,
        process=spawn('python',["rsa_decryption.py"]),
        data =[result[0]["surname"],result[0]["city"],result[0]["address"],result[0]["e_mail"]];
    
        process.stdout.on('data',function(data){
          
          
         dataString=data.toString()
         str_list=dataString.split("\n")
         
        
        });
        process.stdout.on('end',function(){
  
            res.send(str_list)

           
        })
      
        process.stdin.write(JSON.stringify(data));
        process.stdin.end();
        db.close();

      }

     else{
        res.send("")
      }
}
      );

    

    });
     

    });


router.get("/",(req,res)=>{
  res.sendFile('/test.html',{root:__dirname})
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
  mongoClient.connect(`${mongodb_main_uri}`,{useNewUrlParser:true},(err,client)=>{
    if(err){
      return err
    }
    else{
      let db=client.db('Health_care')
      let collection=db.collection('report_type')
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
      let db=client.db(`${report_database}`)
      let collection=db.collection(`${report_collection}`)
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
//module.exports=app
app.listen(port,host,()=>{
  console.log(`Server listen ${host}:${port}`)
});

