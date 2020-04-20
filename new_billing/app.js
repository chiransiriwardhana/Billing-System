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
let Schema=mongoose.Schema;

const activitySchema=new Schema({
  C:Number,
  hospitalFee :Number,
  consultantFee:Number,
  cashier:String,
  consultent:String,
  roomNo:Number,
  appointmentNo:Number,
  appointmentOn:Date,
  referenceNo:Number,
  city:String,
  address:String,
  e_mail:String,
  telephone:String,
  gender:String,
  dateOfBirth:Date,
  surname:String,
  firstName:String
 });

var Activity=mongoose.model('Activity',activitySchema);
module.exports=Activity;
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
mongoose.Promise=require('bluebird');
mongoose.connect('mongodb://localhost:27017/billingSystem');
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.use(function(req,res,next){
	//console.log('Hii**');
	next();
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/bilingNew.html'));

});

app.get('/api/getActivities',function(req,res){
  console.log('get activities');
  Activity.find({}).then(eachOne=>{
  	res.json(eachOne);
  });
});

app.post("/api/activities", (req, res) => {
  var myData = new Activity(req.body);
  myData.save()
  .then(activity => {
  res.end();
 })
 .catch(err => {
   res.status(400).send("unable to save to database");
 });

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

app.listen(4000);
console.log('Starting application.');
