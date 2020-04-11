
$(document).ready(function(){

    $('#target').submit(function(event){
         var c_Input=$('#c_').val();
         var cashier_Input=$('#cashier_').val();
         var consultent_Input=$('#consultent_').val();
         var room_no_Input=$('#room_no').val();
         var appointment_no_Input=$('#appointment_no').val();
         var appointment_on_Input=$('#appointment_on').val();
         var reference_no_Input=$('#reference_no').val();
         var city_Input=$('#city_').val();
         var address_Input=$('#address_').val();
         var e_mail_Input=$('#e_mail_').val();
         var telephone_Input=$('#telephone_').val();
         var date_of_birth_Input=$('#date_of_birth').val();
         //var gender_Input=$('#gender:checked').val();

      var g_Input = $('input[name=gender]:checked').val(); 
            
        

         var surname_Input=$('#surname_').val();
         var first_name_Input=$('#first_name').val();


          var final=(c_Input=="")||(cashier_Input=="")||(consultent_Input=="")||(room_no_Input=="")||(appointment_no_Input=="")
          ||(appointment_on_Input=="")||(reference_no_Input=="")||(city_Input=="")||(address_Input=="")||(e_mail_Input=="")
          ||(telephone_Input=="")||(date_of_birth_Input=="")||(g_Input==undefined)||(surname_Input=="")||(first_name_Input=="");



      if( final  ){
        swal("Form is incomplete !!");
          //alert("Enter correct informations");
      //window.open("header.html","_self")
            //functionAlert();
      //$( "diag-container" ).html();
      //jQuery('#prompt').css('opacity') = '0.6';
    

    }
    else{
    }

});

});





document.querySelector('#target').addEventListener('submit', function(e) {
  

  //var cashier_Input=document.querySelector('#cashier_').val()

 //var cashier_Input=$('#cashier_');
 //alert(cashier_Input);


  var form = this;

  e.preventDefault(); // <--- prevent form from submitting
  
  swal({
      title: "",
      text: "Do you want to submit form",
      icon: "",
      buttons: [
        'No!',
        'Yes!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
       /* swal({
          title: 'Shortlisted!',
          text: 'Candidates are successfully shortlisted!',
          icon: 'success'
        }).then(function() {
          form.submit(); // <--- submit form programmatically
        });


        */
        form.submit();
      } else {
        //swal("");
      }
    });
  
});