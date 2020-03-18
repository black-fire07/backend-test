var leng=document.querySelectorAll(".song");
for(var i=0; i<leng.length;i++){
  var demo = document.querySelectorAll(".song")[i].addEventListener("click",playsong);
  var demo = document.querySelectorAll(".song")[i].addEventListener("dblclick",pausesong);
}

var song1= new Audio();
song1.src="Cheating on You.mp3";

function playsong(){

    var songid=this.innerHTML;
 
    switch (songid) {
        case 'a':
            song1.play();
            
            break;
    
        default:
            break;
    }
    
}
function pausesong(){
    var songid=this.innerHTML;
    switch (songid) {
        case 'a':
            song1.pause();
            
            break;
    
        default:
            break;
    }
}