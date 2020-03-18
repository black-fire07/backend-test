 $(document).ready(function(){
  $(".card").mouseover(function(){
     $(this).children().css("display","block");
     $(this).css("border","5px solid #73AD21")
 });
 $(".card").mouseleave(function(){
    $(this).children().css("display","none");
     $(this).css("border","2px solid #73AD21")    
});

});