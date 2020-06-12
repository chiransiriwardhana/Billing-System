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
         if(res.page==4){
          
          window.location.href = "https://report-uploading.herokuapp.com"
        
         }
         else if(res.page==3){
          window.location.href = "https://billing--app.herokuapp.com"
         }
         else if(res.page==0){
           alert("username or password is incorrect!!")
         }
         else{}
      }
  });
})
