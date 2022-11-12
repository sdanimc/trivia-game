var correct = 0;
var wrong = 0;
var timerVis = document.getElementById('countdown');
var startBtn = document.querySelector("#start");
//var answerBtn = document.querySelector(".answer");
//var answerBtn = document.getElementsByClassName("answer");
var trueBtn = document.getElementById("true-btn");
var falseBtn = document.getElementById("false-btn");
var timeLeft;
var currentScoreText = document.querySelector("#currentscore");

//has to be undefined but declared outside of function so other function can affect it
var currentQuestion = 0;

function countdown() {
    timeLeft = 20;
    function saveYourScores() {
        if (correct >= savedScore5) {
            var playerName = window.prompt("Save score? Write Your Name Here!", "");
            if (!playerName || playerName == "") { return saveYourScores; }
            else {
                var playScore = correct;
                var savedScore5 = document.querySelector("#5thscore");
                savedScore5.value = playScore + " " + playerName + " 5th Top Score!"
                //need to set up comparisions to saved scores, use parseInt
                //why is this function in here? move out
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
        }
    }, 1000);
}
var questions = [
    { question: "Kangaroos can swim", answer: true },
    { question: "Male reindeer lose their antlers well before Christmas while female reindeer keeps their antlers through the holidays", answer: true },
    { question: "Rhinos, Elephants and Hippos are genetic relatives known together as pachyderms", answer: false },
    { question: "Antibacterial soap is super helpful to prevent disease and environmentally friendly", answer: false },
    { question: "Moose are strong divers holding their breath for a full minute and reaching 6 meters deep", answer: true },
    { question: "Polar bears don't eat penguins but they coexist instead in Antartica", answer: false },
    { question: "New Zealand has no native mammals except for bats", answer: true },
    { question: "Bats can swim", answer: true }
];
var showQuestion = function () {
    var questionText = document.querySelector("#question");
    questionText.value = questions[currentQuestion].question;
    if (timeLeft == 0) {
        return;
    };
};
function answerClick(event) {
    var btn1 = event.target;
    var userInput;
    if (!btn1.matches(".answer")) {
        return;
    };
    if (btn1.matches("#true-btn")) {
        userInput = true;
    } else if (btn1.matches("#false-btn")) {
        userInput = false;
    };
    if (userInput !== questions[currentQuestion].answer) {
        //penalities
        timeLeft -= 10;
        wrong++;
        //need to add place for correct or wrong text
    }
    else {
        correct++;
        currentScoreText.value = correct;
    };
    currentQuestion++;
    if (currentQuestion === questions.length) {
        timeLeft == 0;
    } else {
        showQuestion();
    }


}
var playGame = function () {
    //add correct and wrong =0 to clear scoreboard?? and currentquestion to 0 to reset
    correct = 0;
    currentScoreText.value = correct;
    wrong = 0;
    currentQuestion = 0;
    showQuestion();
}

startBtn.addEventListener("click", playGame);
startBtn.addEventListener("click", countdown);
// startBtn.onclick startbtn uses query selector for id and does not recognize onclick here
//answerBtn.onclick = answerClick; doesn't view .onclick as anything because uses query selector not get by id
//answerBtn.onclick = answerClick; doesn't like get by class either
//answerBtn.addEventListener("click", answerClick); works only on true btn
trueBtn.onclick = answerClick;
falseBtn.onclick = answerClick;
//now with get be id it works fine
