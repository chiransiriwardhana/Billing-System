/*document.getElementById("submitForm").onsubmit=function(){submit_function() };
function submit_function() {
var username_=document.getElementById('userName').value;
var password_=document.getElementById('passWord').value;
  //console.log(username_);
  //console.console.log(password_);
  if(!( (username_==="")  || (password_==="") ) ){

    location .href= "tech-patient.html";

 }

}*/



$('#submitForm').submit(function(e){
  e.preventDefault();
  $.ajax({
      url:'/data',
      type:'post',
      data:$('#submitForm').serialize(),
      success:function(res){
         if(res){
          //alert("username or password correct !!");
          window.location.replace("/t.html");
         }else{
           alert("username and password is incorrect!!")
         }
      }
  });
})
