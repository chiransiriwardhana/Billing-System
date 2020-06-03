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
//let host=process.env.HOST  
//let url=process.env.MONGODB_URI
//let database=process.env.MONGODB_DATABASE
//let database_collection=process.env.MONGODB_COLLECTION  */


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

    query = { username: data["Username"], password: data["Password"] }

    mongoClient.connect('mongodb://127.0.0.1:27017/technician', function (err, db) {
        if (err) throw err

        var dbo = db.db('technician')
        query = { username: data["Username"] }

        console.log("encryt username and password")
        var l = encrypt([data['Username'], data['Password']])
        console.log(l)
        dbo.collection('technicianData').find(query).toArray(function (err, result) {
            if (err) throw err

            if ((result[0]["username"] != data["Username"]) || (result[0]["password"] != data["Password"])) {

                res.send(false)

                // res.status(204).send();
            }
            else {

                res.send(true)

            }

        })
    })
})

app.get("/", (req, res) => {

    res.sendFile('/technicianLogin.html', { root: __dirname })
})

function search(en_username, en_password) {
    query = `SELECT role_id FROM role WHERE username=$1 AND password=$2`
    values = [en_username, en_password]
    pool.query(query, values, (err, results) => {
        if (err) throw err
        return results
    })
    //console.log(results)

}

app.post("/sign_up", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var role_name = req.body.role_type
    var f_name = req.body.f_name
    var l_name = req.body.l_name
    var b_date = req.body.b_date
    var d_type = req.body.doctor_type
    var phone = req.body.phone_number
    var email = req.body.email
    if (req.body.confirm == password) {

        var spawn = require('child_process').spawn
        py = spawn('python', ['rsa_encryption.py']),
            data = [username, password],
            str_list = [];


        py.stdout.on('data', function (data) {
            str_data = data.toString();
            str_list = str_data.split("\n");
        });


        py.stdout.on('end', function (data) {
            role_query=`INSERT INTO Role (role_name,username,password)VALUES ($1,$2,$3)`
            values_role=[role_name,str_list[0],str_list[1]]
            pool.query(role_query,values_role,(err,result)=>{
                if(err) throw err
                console.log("data inserted to role table")
            })
            id_query = 'SELECT role_id FROM role ORDER BY Role_id DESC LIMIT 1'
            var role_id
            pool.query(id_query, (err, results) => {
                if (err) throw err
                role_id = results.rows[0]['role_id']



                role_id = parseInt(role_id)+1

                if (role_name == 'Doctor') {
                    var query_doctor = 'INSERT INTO Doctor (first_name,last_name,password,phone_number,e_mail,doctor_type_id,birth_date,role_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
                    var val = [f_name, l_name, str_list[1], phone, email, d_type, b_date, role_id]

                    pool.query(query_doctor, val, (err, results) => {
                        if (err) throw err
                        console.log("data inserted to doctor table")

                    })

                }
                else if (role_name == 'Technician') {
                    //change e_mail to email before upload to heroku else{

                    var query_doctor = 'INSERT INTO Receptionist (first_name,last_name,password,phone_number,email,birth_date,role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
                    var val = [f_name, l_name, str_list[1], phone, email, b_date, role_id]

                    pool.query(query_doctor, val, (err, results) => {
                        if (err) throw err
                        console.log("data inserted to technician table")

                    })
                }
                else {
                    var query_doctor = 'INSERT INTO Technician (first_name,last_name,phone_number,e_mail,birth_date,password,role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
                    var val = [f_name, l_name, phone, email, b_date, str_list[1], role_id]

                    pool.query(query_doctor, val, (err, results) => {
                        if (err) throw err
                        console.log("data inserted to technician table")

                    })

                }

            })


        })

        py.stdin.write(JSON.stringify(data))
        py.stdin.end();
        res.send(`You logged as ${username}`)

    }
    else {
        res.send("confirm password again")
    }



})

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

app.get("/", (req, res) => {

    res.sendFile('/link.html', { root: __dirname })
})


app.use("/", router)

//module.exports=app

app.listen(port, () => {
    console.log('Server started')
});