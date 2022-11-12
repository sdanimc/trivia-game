var correct = 0;
var wrong = 0;
var totalScore = 0;
var timerVis = document.getElementById('countdown');
var startBtn = document.querySelector("#start");
var answerBtn = document.querySelector(".answer");
var timeLeft;
//has to be undefined but declared outside of function so other function can affect it

function countdown() {
    timeLeft = 10;
    function saveYourScores() {
        if (correct >= savedScore5) {
            var playerName = window.prompt("Save score? Write Your Name Here!", "");
            if (!playerName || playerName == "") { return saveYourScores; }
            else { 
                var playScore = correct;
                var savedScore5 = document.querySelector("#5thscore");
                savedScore5.value = playScore + " " + playerName + " 5th Top Score!"
                //need to set up comparisions to saved scores, use parseInt
            }
        }
        else { return; };
    };
    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerVis.textContent = timeLeft + " tick..tick..tick..";
            timeLeft--;
            //startBtn.setAttribute("styles","display: none;"); why can't i use var startbtn since already defined
            document.getElementById('start').style.display = "none";
            //document.getElementsByClassName('btn answer').style.display = "block"; why doesn't it see style as css property
            document.getElementById('true-btn').style.display = "inline-block";
            document.getElementById('false-btn').style.display = "inline-block";
        } else {
            timerVis.textContent = " ";
            clearInterval(timeInterval);
            alert("Game Over! You got " + correct + " right and " + wrong + " wrong!");
            saveYourScores();
            document.getElementById('start').style.display = "inline-block";
            document.getElementById('true-btn').style.display = "none";
            document.getElementById('false-btn').style.display = "none";
            // move alert and btn styles to playGame b/c show when timeleft=0 OR questionsleft? or make if questionsLeft = 0 {timeLeft =0}
        }
    }, 1000);
}
var playGame = function () {
    //show question and answer btns triggered by clicking answer and start
    // if (userInput = answer) {change text to correct} else {change text to wrong, timeLeft = timeLeft-10};
    //var questionsLeft = questions.length substracting one everytime run 
    //if (questionsLeft==0) {timeLeft = 0}

}

startBtn.addEventListener("click", playGame);
startBtn.addEventListener("click", countdown);

//answerBtn.addEventListener("click", playGame);

