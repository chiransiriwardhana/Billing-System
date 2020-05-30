const express=require('express');
const app=express();
const bodyParser=require('body-parser');
//const mongoose=require('mongoose');
const path=require('path');
//const mongodb=require('mongodb');
const fs=require('fs');
var JSAlert = require("js-alert");
var alert=require('sweetalert');
//var autoincrement = require('mongoose-autoincrement-id');
//mongoose.plugin(autoincrement);
//==============================================================================
//var port=process.env.PORT||4000;
var port =process.env.PORT
//let database_url="mongodb+srv://chiran_siriwardhana:chiransiriwardhana@cluster0-fv81a.mongodb.net/test?retryWrites=true&w=majority" 

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
const { Pool } = require('pg');

const pool = new Pool({
  user: 'uzbobogaegwmzd',
  host: 'ec2-23-20-129-146.compute-1.amazonaws.com',
  database: 'duha2esu1auve',
  password: '54824eccf22233fc5b235f63da1ef5df4c85920aa9f4aa3e59f1563f3c95f739',
  port: 5432,
});
//mongoose.Promise=require('bluebird');

/*mongoose.connect(database_url||'mongodb://127.0.0.1:27017/billing_final',{ 

  useNewUrlParser:true,
  useUnifiedTopology:true

});
*/

//mongoose.connection.on('connected',()=>{})

//let Schema=mongoose.Schema;

//const activitySchema=new Schema({
  //finalPayment:String,
  //hospitalFee :String,
  //consultantFee:String,
  //cashier:String,
  //consultent:String,
  //roomNo:String,
  //appointmentNo:String,
  //appointmentOn:String,
  //referenceNo:String,
  //city:String,
  //address:String,
  //e_mail:String,
  //telephone:String,
  //gender:String,
  //dateOfBirth:String,
  //surname:String,
  //firstName:String
 //});

 
//var Activity=mongoose.model('Activity',activitySchema);
//module.exports=Activity;



publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.use(function(req,res,next){
	//console.log('Hii**');
	next();
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/billing.html'));

});

app.get('/api/getActivities',function(req,res){
  console.log('get activities');
  Activity.find({}).then(eachOne=>{
  	res.json(eachOne);
  });
});

app.post("/api/activities", (req, res) => {

  var string = JSON.stringify(req.body);
  var objectValue = JSON.parse(string);

  var spawn=require('child_process').spawn
  py    = spawn('python', ['rsa_encryption.py']),
  data=[objectValue['appointmentNo'],objectValue["roomNo"],objectValue['consultent'],objectValue['cashier'],objectValue['hospitalFee'],objectValue['consultantFee'],objectValue['finalPayment'],objectValue['appointmentOn']],
  str_list=[];

  py.stdout.on('data', function(data){
    str_data=data.toString();
   str_list=str_data.split("\n");
   
  });

  
 py.stdout.on('end',function(data){
 
  objectValue['appointmentNo']=str_list[0];
  objectValue["roomNo"]=str_list[1];
  objectValue['consultent']=str_list[2];
  objectValue['cashier']=str_list[3];
  objectValue['hospitalFee']=str_list[4];
  objectValue['consultantFee']=str_list[5];
  objectValue['finalPayment']=str_list[6]
  objectValue['appointmentOn'] =str_list[7];


  //objectValue['appointmentOn']=str_list[7];
  //objectValue['appointmentNo']=str_list[8];
  //objectValue['roomNo']=str_list[9];
  //objectValue['consultent']=str_list[10];
  //objectValue['cashier']=str_list[11];
  //objectValue['hospitalFee']=str_list[12];
  //objectValue['consultantFee']=str_list[13]
  //objectValue['finalPayment']=str_list[14];
  id_query = 'SELECT role_id FROM role ORDER BY role_id DESC LIMIT 1'
  pool.query(id_query,(err,result)=>{
    if (err) throw err;
    var app_id=results.rows[0]['appointment_id']
  

  const query_1=`INSERT INTO payment (paid_date,appointment_no,room_no,doctor,cashier,hospital_fees,doctor_fees,final_fees,appointment_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`

  const values=[objectValue['appointmentOn'],objectValue['appointmentNo'],objectValue["roomNo"],objectValue['consultent'],objectValue['cashier'],objectValue['hospitalFee'],objectValue['consultantFee'],objectValue['finalPayment'],10]
  //const values=['chiran','chathwara','1996/10/25','0713452436','chiran@gmail.com','No:5/9,Rahula Lane,Matara','Matara']
  pool.connect((err,client,done)=>{
    if(err) throw err;
    client.query(query_1,values,(err,res)=>{
      done();
      if(err){
        console.log(err.stack)
      }
      else{
        console.log('data inserted successfully')
      }
    })
  });

});
 
  //var myData = new Activity(objectValue);
  //myData.save()
  //.then(activity => {
  //res.end();
 //})
 //.catch(err => {
   //res.status(400).send("unable to save to database");
 //});


 
  })
  
  //res.status(204).send()
  py.stdin.write(JSON.stringify(data));
  py.stdin.end();
  res.status(204).send()
  res.end();

  

 

});


/*app.post('/api/activities',function(req,res){
Activity.create({
  hospitalFee:req.body.hospitalFee,
  consultentFee:req.body.consultentFee
  }).then(activity=>{
      res.json(activity);
  });
  res.send();
});
*/

app.get('/api/activities/:activity_id',function(req,res){
	Activity.findById(req.params.activity_id).then(function(err,activity)
	{
		if(err){
			res.send(err);
		}
		res.json(activity);
	});
});

app.listen(port);
