var ran = Math.floor(Math.random()*6) + 1;
var ran1 = Math.floor(Math.random()*6) + 1;
var x1 = "dice"+ran.toString()+".png";
var x2 = "dice"+ran1.toString()+".png";
document.querySelector(".img1").setAttribute("src","images/"+x1);
document.querySelector(".img2").setAttribute("src","images/"+x2);
if(ran1>ran){
    document.querySelector("h1").innerHTML="Player 2 wins!🚩";
}
else if(ran>ran1){
    document.querySelector("h1").innerHTML= "🚩Player 1 wins!";
}
else{
    document.querySelector("h1").innerHTML= "Draw!";
}