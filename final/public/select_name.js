
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

        $("#info_label").html('patient information')
        //$('#info_label').text( "patient information")
         $('#p_name').text(res[0])
          $('#city').text(res[1])
          $('#address').text(res[2])
          $('#e_mail').text(res[3])
      }
  });
})
