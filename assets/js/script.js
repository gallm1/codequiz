var currentQuestionIndex = 0;
var time = 86;
var timerId;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("start-time");
var optionsEl = document.getElementById("options");
var subButton = document.getElementById("submit");
var beginButton = document.getElementById("begin-button");
var initialsEl = document.getElementById("initials");
var messageEl = document.getElementById("message");

// begin quiz - clears begin menu - shows the question - starts timer

function beginQuiz() {
    var beginMenuEl = document.getElementById("begin-menu");
    beginMenuEl.setAttribute("class", "hidden");
    // shows questions
    questionsEl.removeAttribute("class");
    // starts timer
    timerId = setInterval(timeTicker, 1000);
    // countdown start time
    timerEl.textContent = time;

    getQuestion();

}

// 
function timeTicker () {
    // updates the time
    time--;
    timerEl.textContent = time;
    // time over, ends quiz
    if (time <= 0) {
        quizEnd();
    }
}

// retrieves questions, updates new question, clears out old question, creates new button for options, adds click event listener
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex]

    var titleEl = document.getElementById("single-question");
    titleEl.textContent = currentQuestion.question;

    optionsEl.innerHTML = "";

    currentQuestion.options.forEach(function(option, i) {
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "option");
        optionButton.setAttribute("value", option);

        optionButton.textContent = i + 1 + ". " + option;

        optionButton.onclick = questionClick;

        optionsEl.appendChild(optionButton);

    });
}

// checks answer, deducts time if wrong, 
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 16;

        if (time < 0 ) {
            time = 0;
        }

        timerEl.textContent = time;

        messageEl.textContent = "You're Wrong!!!";        
    } else {
        messageEl.textContent = "You're Right!!!";
    }

    messageEl.setAttribute("class", "message");
    setTimeout(function() {
        messageEl.setAttribute("class", "message hidden");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// stops timer, moves to score screen
function quizEnd () {
    clearInterval(timerId)

    var scoreScreenEl = document.getElementById("score-screen");
    scoreScreenEl.removeAttribute("class");

    var scoreEl = document.getElementById("score");
    scoreEl.textContent = time;

    questionsEl.setAttribute("class", "hidden");
}





beginButton.onclick = beginQuiz;