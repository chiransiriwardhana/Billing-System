const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const mongodb=require('mongodb');
const fs=require('fs');
var JSAlert = require("js-alert");
var alert=require('sweetalert');
var autoincrement = require('mongoose-autoincrement-id');
mongoose.plugin(autoincrement);
var port=process.env.PORT||4000;
let database_url="mongodb+srv://chiran_siriwardhana:chiransiriwardhana@cluster0-fv81a.mongodb.net/test?retryWrites=true&w=majority" 

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
mongoose.Promise=require('bluebird');

mongoose.connect(database_url||'mongodb://127.0.0.1:27017/billing_final',{ 

  useNewUrlParser:true,
  useUnifiedTopology:true

});

mongoose.connection.on('connected',()=>{})

let Schema=mongoose.Schema;

const activitySchema=new Schema({
  //finalPayment:String,
  //hospitalFee :String,
  //consultantFee:String,
  //cashier:String,
  //consultent:String,
  //roomNo:String,
  //appointmentNo:String,
  //appointmentOn:String,
  //referenceNo:String,
  city:String,
  address:String,
  e_mail:String,
  telephone:String,
  //gender:String,
  dateOfBirth:String,
  surname:String,
  firstName:String
 });

 
var Activity=mongoose.model('Activity',activitySchema);
module.exports=Activity;



var publicDir = require('path').join(__dirname,'/public');
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
  data=[objectValue['firstName'],objectValue['surname'],objectValue["dateOfBirth"],objectValue['telephone'],objectValue['e_mail'],objectValue['address'],objectValue['city']],
  str_list=[]

  py.stdout.on('data', function(data){
    str_data=data.toString();
   str_list=str_data.split("\n");
  });

  py.stdout.on('end',function(data){
  objectValue['firstName']=str_list[0];
  objectValue['surname']=str_list[1];
  objectValue['dateOfBirth']=str_list[2];
  objectValue['telephone']=str_list[3];
  objectValue['e_mail']=str_list[4];
  objectValue['address']=str_list[5];
  objectValue['city']=str_list[6];
  //objectValue['appointmentOn']=str_list[7];
  //objectValue['appointmentNo']=str_list[8];
  //objectValue['roomNo']=str_list[9];
  //objectValue['consultent']=str_list[10];
  //objectValue['cashier']=str_list[11];
  //objectValue['hospitalFee']=str_list[12];
  //objectValue['consultantFee']=str_list[13]
  //objectValue['finalPayment']=str_list[14];

  var myData = new Activity(objectValue);
  myData.save()
  .then(activity => {
  res.end();
 })
 .catch(err => {
   res.status(400).send("unable to save to database");
 });

  })
  

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
