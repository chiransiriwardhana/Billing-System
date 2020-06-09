/*const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Health_care',
    password: 'Chiran@123',
    port: 5432,
  })

  var found=false;
  function search(x,y,callback){
    query='SELECT * FROM Appointment WHERE appointment_id=$1 AND patient_id=$2'
    values=[3,1]
    pool.query(query,values,(err,results)=>{
        if(err) throw err
    
       if(results.rows[0]['appointment_id']==x || results.rows[0]['patient_id']==y){
           
           found=true;
           callback(found)
       }
      
       
   
    })
    //return found
    

  }

 var x=search(3,1,function(found){
      //return found;
      console.log(found)
  })
  
 console.log(x)

  /*
    function test(x,y){
        //let found=false;
        query='SELECT * FROM Appointment WHERE appointment_id=$1 AND patient_id=$2'
        values=[3,1]
        pool.query(query,values,(err,results)=>{
            if(err) throw err
            
            //console.log(typeof(results.rows[0]['appointment_id']))
            //console.log(typeof(results.rows[0]['patient_id']))
           if(results.rows[0]['appointment_id']==x || results.rows[0]['patient_id']==y){
               this.found=true;
               //console.log(this.found)
           }
       
        })
        
       
        return this.found;
       }
console.log(search.test(3,1))
//search.test(3,1)

*/






//async function search(en_username, en_password) {
 //   query = `SELECT * FROM Receptionist WHERE username=$1 AND password=$2`
   // values = [en_username, en_password]
   
     //var found=false;
    
    //var re=await pool.query(query, values)

    //if (re.rows[0]['username']==en_username || re.rows[0]['password']==en_password){
    //if ('chiran'==en_username || 'Chiran@123'==en_password){
      //  found=true
    
    //}

    //return found
    //console.log(found)
        
        
               

                //console.log("password#################")
                //console.log(results.rows[0]['password'])
                //console.log("*************************")
                //console.log("username#################")
                //console.log(results.rows[0]['username'])
                //console.log("*************************")
       
       //console.log(results.rows[0])
       // return found
    
    

    
    //console.log(results)
//}


function Validate(input_txt ){
   
    var regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var isValid = regex.test(input_txt);
    
    
     if(isValid){
            return true
     }else{
            return false
     }

    
}

  console.log(Validate("Chiran@123"))