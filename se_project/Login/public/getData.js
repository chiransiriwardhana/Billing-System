$('#target').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'/search',
        type:'post',
        data:$('#target').serialize(),
        success:function(res){
           console.log(res)
        }
    });
  })
  