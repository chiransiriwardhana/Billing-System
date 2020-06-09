const express = require('express')
const fileUpload = require('express-fileupload');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require("path");
const app = express();
const router = express.Router()
const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require('mongoose')
const { Pool } = require('pg')
//const { Client } = require('pg')
const port = process.env.PORT
//const port = 16000
var MONGODB_URI = 'mongodb+srv://chiran_siriwardhana:chiransiriwardhana@cluster0-fv81a.mongodb.net/test?retryWrites=true&w=majority'
var autoincrement = require('mongoose-autoincrement-id');


const pool = new Pool({
  user: 'uzbobogaegwmzd',
    host: 'ec2-23-20-129-146.compute-1.amazonaws.com',
    database: 'duha2esu1auve',
    password: '54824eccf22233fc5b235f63da1ef5df4c85920aa9f4aa3e59f1563f3c95f739',
    port: 5432,
});
/*
const client_ = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Health_care',
  password: 'Chiran@123',
  port: 5432,
});*/



var id;



//routes============================
async function selectFrom(){
  try{
    const res=await pool.query('SELECT * FROM patient_')
    return res.rows[0]
  }catch(err){
    return 
  }
}

/*
mongoose.connect(MONGODB_URI||'mongodb://127.0.0.1:27017/report',{ 

  useNewUrlParser:true,
  useUnifiedTopology:true

});

var Schema=mongoose.Schema;


var ReportSchema=new Schema({
  _id:Number,
  report_type_id:Number,
  document:Buffer,
  status:String
})

var ReportNameSchema=new Schema({
  _id:Number,
  report_name:String
})

var report_types=mongoose.model('report_types',ReportNameSchema)
module.exports=report_types

var reports=mongoose.model('reports',ReportSchema)
module.exports=reports

*/



router.post('/search', async (req, res)=> {



  id = parseInt(req.body.patient_info);

  //var appointmentId=await pool.query('SELECT * FROM Appointment WHERE appointment_id=$1',[id])
  //appointment=appointmentId.rows[0]['appointment_id']
  //console.log("appointment")
  //console.log(appointment)
  var diagnosisTypeId=await pool.query('SELECT * FROM Diagnosis WHERE appointment_id=$1',[id] )
  diagnosis=diagnosisTypeId.rows[0]['diagnosis_type_id']
  console.log("diagnosis")
  console.log(diagnosis)
  var diseas=await pool.query('SELECT * FROM Diagnosis_Type WHERE diagnosis_type_id=$1',[diagnosis])
  d=diseas.rows[0]['diagnosis_type']
  console.log("d")
  console.log(d)
 //var x;

 //?????????????????????
 //const result=await pool.query('SELECT * FROM Appointment WHERE patient_id=$1',[id])
  //var id_=result.rows[0]['appointment_id']
  //console.log(result.rows[0]['appointment_id'])

  //var query={_id:id_}
  //console.log(query)
  //d=new reports({_id:8,report_type_id:3,document: binary(req.files.uploadedFile.data),status:"need to upload"})
  //d.save()
  //let r= await reports.find({_id:4});
  //console.log("r")
  //console.log(r)
  //var report_type_id=r[0]['report_type_id']
  //console.log(r[0]['report_type_id'])



 //var data_=new report_types({_id:1,report_name:"blood report"})
 //data_.save()

 //var data=new reports({_id:2,report_type_id:1,status})
 //data.save()


 mongoClient.connect(MONGODB_URI||'mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (err, db) => {
    if(err) throw err

    var dbo = db.db('report');
    var query = { _id:id };
    dbo.collection('reports').find(query).toArray(function(err, result) {
        if (err) throw err;
        var x=result[0]['report_type_id'];
        console.log("result x")
        console.log(x);
       // console.log("diagnosis*****************")
        //console.log(diagnosis)

        query_={_id:x}
        dbo.collection('report_types').find(query_).toArray(function(err, result) {
          if (err) throw err;
          y=result[0]['report_name'];
          console.log("result y")
          console.log(y);

          pool.query('SELECT * FROM Appointment WHERE appointment_id  = $1', [id], (error, results) => {
            if (error) {
              throw error
            }
            if (JSON.stringify(results.rows) != "{}") {
              var patient_id=results.rows[0]['patient_id']
              pool.query('SELECT * FROM Patient WHERE patient_id=$1',[patient_id],(error,results)=>{
                if(error) throw error
                data = [results.rows[0]['first_name'], results.rows[0]['city'], results.rows[0]['street'], results.rows[0]['email'],y,d]
                res.send(data)
              })
              
            }
            else {
              res.send("")
        
            }
          })
        




  });
})

 });

//console.log("x")
//console.log(x)


 /*let report_name=await report_types.find({_id:report_type_id})


console.log("name")
report_name=report_name[0]['report_name']

console.log(report_name)*/





/*
 var db=await mongoClient.connect('mongodb://127.0.0.1:27017');
 var query={_id:id_}
 var dbo=db.db("report")

 var r=await dbo.collection("Report").find(query)

console.log("r")
console.log(r)

console.log("*****")*/
//res.json(r)

 //mongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true },async function (err, client) {
   // if(err)throw err

      //let db = client.db('report')
      //var query={_id:id_}
      //var x={};
     /* db.collection('Report',function(err,collection){
        collection.find(query).toArray(function(err,result){
            x=result[0];
            console.log("x")
            console.log(x)
        })
      })
      console.log("x======")
      console.log(result[0])*/



      /*var query={_id:id_}
      let collection = db.collection('Report')
       console.log("query")
       console.log(query)
       var r=await collection.find(query).toArray(async function(err,result){
         if(err) throw err
         console.log('result')
          console.log(result)
         
       })

       console.log('r')
          console.log(r)*/

       
      

      //client.close()
      //res.redirect('/')
//})


  

 
//console.log("********")
//console.log(id)


  /*pool.query('SELECT * FROM Patient WHERE patient_id  = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (JSON.stringify(results.rows) != "{}") {
     
      data = [results.rows[0]['first_name'], results.rows[0]['city'], results.rows[0]['street'], results.rows[0]['email']]
      res.send(data)
    }
    else {
      res.send("")

    }
  })*/


});


router.get("/", (req, res) => {
  res.sendFile('/test.html', { root: __dirname })
})

router.get("/", (req, res) => {
  getFile(res);
})


var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));
app.use(fileUpload())

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


router.post("/upload", (req, res) => {
  console.log("########id")
  console.log(id)
  // patient_id =>
  pool.query('SELECT * FROM Appointment  WHERE appointment_id  = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    else {

      var app_id = results.rows[0]
      var id = app_id['appointment_id']
      let file = { $set: { document: binary(req.files.uploadedFile.data), status: " upload" } }
      insertFile(file, id, res)
      console.log("file insrted")
    }


  });
})

function insertFile(file, app_id, res) {
  mongoClient.connect(MONGODB_URI||'mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
      return err
    }
    else {
      let db = client.db('report')
      let collection = db.collection('reports')
      try {
        collection.update({ _id: app_id }, file);
        console.log("file updated==================================")

      }
      catch (err) {
        console.log("error while inserting file ", err);
      }

      client.close()
      res.redirect('/')


    }

  })

}





function getFiles(res) {

  mongoClient.connect(MONGODB_URI || 'mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
      return err
    }
    else {
      let db = client.db('patient')
      let collection = db.collection('activities')
      collection.find({}).toArray((err, doc) => {
        if (err) {
          console.log("error in finding doc: ", err)
        }
        else {
          let buffer = doc[0].file.buffer
          fs.writeFileSync('uploadedImage.jpg', buffer)
        }
      })

      client.close()
      res.redirect('/')


    }

  })
}




app.use("/", router)
//module.exports=app
app.listen(port);

