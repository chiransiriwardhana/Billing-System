document.getElementById("submitForm").onsubmit=function(){submit_function() };
function submit_function() {
var username_=document.getElementById('userName').value;
var password_=document.getElementById('passWord').value;
  //console.log(username_);
  //console.console.log(password_);
  if(!( (username_==="")  || (password_==="") ) ){

    location .href= "tech-patient.html";

 }

}
