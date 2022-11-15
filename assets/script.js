var correct = 0;
var wrong = 0;
var timerVis = document.getElementById('countdown');
var startBtn = document.querySelector("#start");
var trueBtn = document.getElementById("true-btn");
var falseBtn = document.getElementById("false-btn");
var timeLeft;
//has to be undefined but declared outside of function so other function can affect it
var currentScoreText = document.querySelector("#currentscore");
var currentQuestion = 0;
showSavedScores();

function showSavedScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    var olScores = document.getElementById("highscores");
    if (olScores.childElementCount !== 0) {
        function deleteChild() {
            var first = olScores.firstElementChild
            while (first) {
                first.remove();
                first = olScores.firstElementChild;
            }
        }
        deleteChild();
    };
    for (var i = 0; i < highscores.length; i += 1) {
        var liItem = document.createElement("li");
        //liItem.textContent = highscores[i].score + " " + highscores[i].name + " Top Score!";
        liItem.textContent = highscores[i].name + " had a Top Score of " + highscores[i].score + "!";
        olScores.appendChild(liItem);
    }
};

function saveYourScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var playerName = window.prompt("Save score? Write Your Name Here!", "");
    if (!playerName || playerName == "") { return; }
    else {
        var newHighScore = { score: correct, name: playerName };
        highscores.push(newHighScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        showSavedScores();

    }
};

function countdown() {
    timeLeft = 20;
    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerVis.textContent = timeLeft + " tick..tick..tick..";
            timeLeft--;
            document.getElementById('start').style.display = "none";
            document.getElementById('true-btn').style.display = "inline-block";
            document.getElementById('false-btn').style.display = "inline-block";
        } else {
            var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
            console.log(highscores.length);
            var lowestSaved;
            timerVis.textContent = " ";
            clearInterval(timeInterval);
            if (highscores != null && highscores.length != 0) {
                lowestSaved = highscores[highscores.length - 1].score;
                console.log(lowestSaved);
            } else {
                lowestSaved = 0;
            };
            alert("Game Over! You got " + correct + " right and " + wrong + " wrong!");
            document.getElementById('start').style.display = "inline-block";
            document.getElementById('true-btn').style.display = "none";
            document.getElementById('false-btn').style.display = "none";
            if (correct >= lowestSaved) {
                saveYourScores();
            }

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

    }
    else {
        correct++;
        currentScoreText.value = correct;
    };
    currentQuestion++;
    if (currentQuestion === 8) {
        timeLeft -= timeLeft;
    } else {
        showQuestion();
    }
}
var playGame = function () {
    correct = 0;
    currentScoreText.value = correct;
    wrong = 0;
    currentQuestion = 0;
    showQuestion();
}
function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;



startBtn.addEventListener("click", playGame);
startBtn.addEventListener("click", countdown);
trueBtn.onclick = answerClick;
falseBtn.onclick = answerClick;

