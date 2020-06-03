const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');
const fs=require('fs');
var JSAlert = require("js-alert");
var alert=require('sweetalert');
//var port=4000;
var port=process.env.PORT
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
const { Client } = require('pg');

const client = new Client({
  user: 'uzbobogaegwmzd',
  host: 'ec2-23-20-129-146.compute-1.amazonaws.com',
  database: 'duha2esu1auve',
  password: '54824eccf22233fc5b235f63da1ef5df4c85920aa9f4aa3e59f1563f3c95f739',
  port: 5432,
});

publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.use(function(req,res,next){
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

  /*client.connect()
  const query=`INSERT INTO test (name) VALUES ($1)`
  //const values=[objectValue['appointmentOn'],objectValue['appointmentNo'],objectValue["roomNo"],objectValue['consultent'],objectValue['cashier'],objectValue['hospitalFee'],objectValue['finalPayment'],'10']
  //const values=['chiran','chathwara','1996/10/25','0713452436','chiran@gmail.com','No:5/9,Rahula Lane,Matara','Matara',10,'c']
  const values=[objectValue['cashier']]
  client.query(query,values, (err, results) => {
    if (err) {
        console.error(err);
        return;
    }
    else{
      //res.send(str_list)
    }
    //client.end()
    
  });

  res.status(204).send()

  */


  var spawn=require('child_process').spawn
  py    = spawn('python', ['rsa_encryption.py']),
  data=[objectValue['appointmentNo'],objectValue["roomNo"],objectValue['consultent'],objectValue['cashier'],objectValue['hospitalFee'],objectValue['consultantFee'],objectValue['finalPayment'],objectValue['appointmentOn']],
  str_list=[];

  py.stdout.on('data', function(data){
    str_data=data.toString();
   str_list=str_data.split("\n");
   console.log("appointmentNo")
   console.log(str_list[0])
   console.log("roomNo")
   console.log(str_list[1])
   console.log("consultent")
   console.log(str_list[2])
   console.log("cashier")
   console.log(str_list[3])
   console.log("Hospiteal fees")
   console.log(str_list[4])
   console.log("consultantFee")
   console.log(str_list[5])
   console.log("finalPayemet")
   console.log(str_list[6])
   console.log("appointmentOn")
   console.log(str_list[7])


   
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

  //id_query = 'SELECT appointment_id FROM Appointment ORDER BY appointment_id DESC LIMIT 1'
  ///pool.query(id_query,(err,results)=>{
  //if (err) throw err;
  //var app_id=results.rows[0]['appointment_id']
  //res.send(app_id)
  
  client.connect()
  //const query=`INSERT INTO payment (paid_date,appointment_no,room_no,doctor,cashier,hospital_fees,doctor_fees,final_fees,appointment_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
  //const values=[objectValue['appointmentOn'],objectValue['appointmentNo'],objectValue["roomNo"],objectValue['consultent'],objectValue['cashier'],objectValue['hospitalFee'],objectValue['consultantFee'],objectValue['finalPayment'],10]
  //const values=['chiran','chathwara','1996/10/25','0713452436','chiran@gmail.com','No:5/9,Rahula Lane,Matara','Matara',10,'c']
  const query=`INSERT INTO test (name) VALUES ($1)`
  const values=[objectValue['cashier']]

  client.query(query,values, (err, results) => {
    if (err) {
        console.error(err);
        return;
    }
    else{
      //res.send(str_list)
    }
    client.end()
    
  });

  res.status(204).send()
  

});
 
  py.stdin.write(JSON.stringify(data));
 py.stdin.end();



 
  })
  



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
