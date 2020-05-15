const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const mongodb=require('mongodb');

var MongoClient=require('mongodb').MongoClient;

var url="mongodb://localhost:27017/";

app.use(function(req,res,next){
	next();
});

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("billingSystem");
    dbo.collection("activities").findOne({},function(err,result){
        if(err) throw err;
        console.log(result.surname);
        db.close();
    })
});

app.listen(5000);
console.log("Server started on port: 5000");