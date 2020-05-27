
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
const {Pool}=require('pg')
const port=process.env.PORT
const pool = new Pool({
    user: 'uzbobogaegwmzd',
    host: 'ec2-23-20-129-146.compute-1.amazonaws.com',
    database: 'duha2esu1auve',
    password: '54824eccf22233fc5b235f63da1ef5df4c85920aa9f4aa3e59f1563f3c95f739',
    port: 5432,
});

router.post('/search',function(req,res){

  const id = parseInt(req.body.patient_info)
  
  pool.query('SELECT * FROM patients WHERE patient_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    
    if(JSON.stringify(results.rows)!="{}")
    {
      var spawn=require("child_process").spawn
          py    = spawn('python', ['rsa_decryption.py']),
          data=[results.rows[0]['first_name'],results.rows[0]['city'],results.rows[0]['street'],results.rows[0]['email']],
          str_list=[];

      py.stdout.on('data',function(data){
        dataString=data.toString()
        str_list=dataString.split("\n")
      });

      py.stdout.on('end',function(){
        res.send(str_list)  
      });

     
      py.stdin.write(JSON.stringify(data));
      py.stdin.end();
    }
    else
    {
        res.send("")
     }
  })
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function insertFile(file,res){
  mongoClient.connect('mongodb://127.0.0.1:27017',{useNewUrlParser:true},(err,client)=>{
    if(err){
      return err
    }
    else{
      let db=client.db('Health_care')
      let collection=db.collection('report')
      try{

        
        //collection.insertOne(file)
        //console.log(getRandomInt(10000000000))
        

        doc_={_id:getRandomInt(10000000000),report:file}

        collection.insertOne(doc_);
        
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
      let db=client.db('Health_care')
      let collection=db.collection('report')
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
app.listen(port);

