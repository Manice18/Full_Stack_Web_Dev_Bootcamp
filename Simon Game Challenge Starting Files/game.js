var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level=0;
var started=false;
$(document).keydown(function(){
    if(!started)
        {
            $("#level-title").text("Level "+level);
            nextSequence();
            started=true;
        }

});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}

//Adding Sounds to Button Clicks
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


//adding animations to user clicks
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

//checking answers
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}   

//starting over
function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}

