
/*
$('#patient_name_button').click(function(){
  console.log('Hi');
  $.ajax({url:'/search',success:function(res){
    var data=res;

    $('#p_name').text(data);
         // console.log(data)
      //  $('#telephone').text(data.sensitiveData[0]);
      //  $('#address').text(data.sensitiveData[1]);
        //personData["telephone"]=data.sensitiveData[0]
        //personData["address"]=data.sensitiveData[1]
  }})
})*/


$('#target').submit(function(e){
  e.preventDefault();
  $.ajax({
      url:'/search',
      type:'post',
      data:$('#target').serialize(),
      success:function(res){

      if(res!=""){
          $("#info_icon").html(' <img src="info.png" id="info_icon" style=" position: absolute;top:29%;float:left;margin-left: 24px;width:20px;height:20px;border-radius:20%;"></img>')
          $('#info_label').text( "patient information")
       
          
            $('#p_name').text(res[0])
          
         
    
            $('#city').text(res[1])
            $('#address').text(res[2])
            $('#e_mail').text(res[3])
            $("#report_icon").html('<img src="info.png" id="report_icon" style="position: absolute;top:64%;float: left;margin-left: 24px;width:20px;height:20px;border-radius:20%;"> </img>')
  
            $("#report_label").text("patient reports")
        }
      else{
        console.log("======res=========from jquery=============")
        console.log(res)

        $('#p_name').text("There is no patient with entered id")

       }
     

     }
      })
    
  });
