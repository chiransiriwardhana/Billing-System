//require('dotenv').config()
const express = require('express')
const app = express()
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const { Pool } = require('pg')
app.use(express.urlencoded())

const router = express.Router()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = new Pool({
  user: 'uzbobogaegwmzd',
  host: 'ec2-23-20-129-146.compute-1.amazonaws.com',
  database: 'duha2esu1auve',
  password: '54824eccf22233fc5b235f63da1ef5df4c85920aa9f4aa3e59f1563f3c95f739',
  port: 5432,
})

var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));
let port=process.env.PORT   



function encrypt(enteredData) {
    var spawn = require("child_process").spawn
    py = spawn('python', ['rsa_encryption.py']),
        data = enteredData,
        encryptData = "",
        encrypt_list = [],
        list_ = []

    py.stdout.on('data', function (data) {
        encryptData += data.toString()
        encrypt_list = encryptData.split("\n");

    });

    py.stdout.on('end', function () {
        
    })

    py.stdin.write(JSON.stringify(data));
    py.stdin.end();





}



app.post('/data', (req, res) => {
    var data = req.body
    console.log('data["Password"]*******************')
    console.log(data["Password"])
    console.log('typeof(data["Password"]*************')
    console.log(typeof(data["Password"]))

    var role=data['Role']
    
    if(role==1){
    
    query=`SELECT  * FROM Doctor WHERE password=$1`

    values =[   data["Password"] ]
    pool.query(query,values, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        else{
            var found=false;
            for(var i=0;i<results.rows.length;i++){
               
                if(results.rows[i]['username']==data['Username']){
                        found=true
                        break
                }
                
            }
            console.log("found")
            console.log(found)
            console.log("found")
            if(found==true){
                res.send(true)
            }
            else{
                res.send(false)
            }

            
          
        }
       
        
      });

    }
    else if(role==2){

        query=`SELECT  * FROM Receptionist WHERE password=$1`

        values =[   data["Password"] ]

        pool.query(query,values, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            else{
                var found=false;
                for(var i=0;i<results.rows.length;i++){
                   
                    if(results.rows[i]['username']==data['Username']){
                            found=true
                            break
                    }
                    
                }
                console.log("found")
                console.log(found)
                console.log("found")
                if(found==true){
                    res.send(true)
                }
                else{
                    res.send(false)
                }
    
                
              
            }
           
            
          });

    }

    else if(role==4){

        query=`SELECT  * FROM Technician WHERE password=$1`

        values =[   data["Password"] ]
        pool.query(query,values, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            else{
                var found=false;
                for(var i=0;i<results.rows.length;i++){
                   
                    if(results.rows[i]['username']==data['Username']){
                            found=true
                            break
                    }
                    
                }
                console.log("found")
                console.log(found)
                console.log("found")
                if(found==true){
                    res.send(true)
                }
                else{
                    res.send(false)
                }
    
                
              
            }
           
            
          });
    }
    else{}

    //mongoClient.connect('mongodb://127.0.0.1:27017/technician', function (err, db) {
        //if (err) throw err

        //var dbo = db.db('technician')
        //query = { username: data["Username"] }

        //console.log("encryt username and password")
        //var l = encrypt([data['Username'], data['Password']])
       
       // dbo.collection('technicianData').find(query).toArray(function (err, result) {
            //if (err) throw err

            //if ((result[0]["username"] != data["Username"]) || (result[0]["password"] != data["Password"])) {

                //res.send(false)

                // res.status(204).send();
            //}
            //else {

                //res.send(true)

           // }

        //})
   // })
})


app.get("/", (req, res) => {

    res.sendFile('/technicianLogin.html', { root: __dirname })
})


/*function check(password){
  
  
   
        var regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        var isValid = regex.test(password);
        
        
         if(isValid){
                return true
         }else{
                return false
         }
    
        
    
}*/



/*

app.post("/sign_up",  function (req, res) {
    
  var string = JSON.stringify(req.body);
  var objectValue = JSON.parse(string);

  console.log("objectValue**************")
  console.log(objectValue)
  
    if ( objectValue['confirm'] == objectValue['password'] ) {

        if(check(objectValue['password'])){
       
        var spawn = require('child_process').spawn
        py = spawn('python', ['rsa_encryption.py']),
        data = [objectValue['username'],objectValue['password']],
        str_list = [],
        username_password=[];
        
        console.log("data################")
        console.log(data)
        py.stdout.on('data', function (data) {
          
          str_data = data.toString();
    

          console.log("str_data")
          console.log(str_data)

          

          username_password.push(str_data)
          console.log("username_password")
          console.log(username_password)
      
        });


        py.stdout.on('end', function (data) {
              
             
              objectValue['username']=str_list[0]
              objectValue['password']=str_list[1]

               if (objectValue['role_type'] == 'Doctor') {
                    var query_doctor = 'INSERT INTO Doctor (first_name,last_name,phone_number,email,birth_date,doctor_type_id,role_id,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
                    var doctor_val = [objectValue['f_name'],objectValue['l_name'],objectValue['phone_number'],objectValue['email'], objectValue['b_date'],3,1,username_password[1]]
                    
                    pool.query(query_doctor, doctor_val, (err, results) => {
                        if (err) throw err
                        console.log("data inserted to doctor table")
                        

                    })

                }
                
                else if(objectValue['role_type'] == 'Technician'){
                    var query_technician = 'INSERT INTO Technician (first_name,last_name,phone_number,email,birth_date,role_id,password,username) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
                    var tech_val = [objectValue['f_name'],objectValue['l_name'],objectValue['phone_number'],objectValue['email'],objectValue['b_date'], 4,username_password[1],username_password[0]]
                   
                    pool.query(query_technician, tech_val, (err, results) => {
                        if (err) throw err
                        console.log("data inserted to technician table")

                    })
                }
                else {

                   
                   

                    var query_receptionist = 'INSERT INTO Receptionist (first_name,last_name,phone_number,email,birth_date,role_id,password,username) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
                    var recep_val = [objectValue['f_name'],objectValue['l_name'],objectValue['phone_number'],objectValue['email'],objectValue['b_date'], 2,username_password[1],username_password[0]]
                    pool.query(query_receptionist, recep_val, (err, results) => {
                        if (err) throw err
                        console.log("data inserted to receptionist table")

                    })

                                
                }

      

            


        })

        py.stdin.write(JSON.stringify(data))

        py.stdin.end();
        res.send(`You logged as ${objectValue['username']}`)

    }

    else{
        res.send("enter password with at least one numeric digit, one uppercase and one lowercase letter ")
    }

    }
    else {
       res.send("confirm password again")
    }



})*/

/*app.post("/upload",function(req,res){

  var role_name=req.body.role_type
  console.log(role_name)
  var query='INSERT INTO role (role_name) VALUES ($1)'
  var values=[role_name]

  pool.query(query,values,(err,results)=>{
      if(err) throw err
      console.log("insert data to database successfully")
  })   
  


})*/

//app.get("/", (req, res) => {

   // res.sendFile('/link.html', { root: __dirname })
//})


app.use("/", router)

//module.exports=app

app.listen(port, () => {
    console.log('Server started')
});