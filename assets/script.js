// DOM Element Variables Below

// Getting the Title of the page DOM Element
var title = document.getElementById("title");
// getting the Form DOM Element
var form = document.getElementById("form");
// getting the Start Button DOM Element
var startButton = document.getElementById("start-quiz");
// getting the Paragraph Feedback DOM Element
var feedback = document.getElementById("feedback");
// gettingg the Timer DOM Element
var timerDisplay = document.getElementById("timer");
// getting the Reset Button DOM Element
var resetButton = document.getElementById("reset");
// getting the Submit Score Button DOM Element
var submitScoreButton = document.getElementById("submit-score");
// getting Clearing Scores Button DOM Element
var clearScoresButton = document.getElementById("clear-scores");
// getting the Paragraph Header DOM Element
var headerText = document.getElementById("header-text");
// getting the Anchor DOM Element
var viewScores = document.getElementById("view-scores");

// Beginning of the non-DOM Element Variables Below

// Beginning of the allowed time for the quiz
var time = 30;
// Beginning of the answer provided by the user
var providedAnswerIndex = 4;
// Beginning of the Index of the correct answer in a question
var correctAnswerIndex = 0;
// Beginning of the time taken off for a wrong answer
var deductedTime = '10';
// Beginning of either points are taken off from score if the choice is wrong
var deductPoints = false;
// Beginning of the counter for the number of questions
var counter = 0;
// Beginning the number of questions there are to ask
var numberOfQuestions = 4;
// Beginning of the person playing information object
var userInfo = {
    name: '',
    score: 0
}
// Beginning of the score list
var userScores = JSON.parse(localStorage.getItem("userScores"));
// Beginning counter for the submitScoreButton;
var counter2 = 0;

// Questions Array and Question Objects
var questions = [
    {question:"Who first invented coding?",
    choices: ["Bill Gates", "Steve Jobs", "Albert Einstein", "Ida Lovelace"],
    answer: "Ida Lovelace"},

    {question: "What does the term CSS mean in the coding world?",
    choices: ["Cute Signature Script", "Cursive Sassy Signature", "Cascading Style Sheets", "Cascading Straight Sheets"],
    answer: "Cascading Style Sheets"},

   {question:"Which celebrity knows coding?",
    choices: ["Oscar Isaac", "will.i.am", "Kim Kardashian", "Pedro Pascal"],
    answer: "will.i.am"},

   {question: "What does HTML mean?",
    choices: ["Home Time Measuring Lanes", "Hyper Marketing Language", "High Market Language", "Hypertext Markup Language"],
    answer: "Hypertext Markup Language"},
];

// Creating Functions Below

// Create the timer
function startTimer(duration, display) {
    // Declaring the variables and starting the timer with the value of duration
    var timer = duration, minutes, seconds;

    // Starting and running the timer
    var countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Deduct points if the answer is wrong
        if (deductPoints) {
            timer = timer - parseInt(deductedTime);
        }

        // Resetting Variable
        deductPoints = false;

        // displaying the timer
        display.textContent = "Time left: " + minutes + ":" + seconds;

        // If the time runs out of time or if the questions have been answered
        if ((--timer <0)||(counter == numberOfQuestions)) {
            userInfo.score = timer;
            clearInterval(countdown);
            form.style.display = "none";
            feedback.textContent = "Your time is up, the score is: " + timer;
            submitScoreButton.style.display = "block";
        }
    }, 1000);

    // If the timer runs out of time, then the score will be zero
    if (userInfo.score <= 0) {
        userInfo.score = 0;
    }

    // Returning the value of the person's score
    return userInfo.score;
}

// Updating the Question
function updateQuestion(){
    // Generate a new question
    chosenQuestion = questions[(Math.floor(Math.random()*questions.length))];
    // Save the answer of the question
    answer = chosenQuestion.answer;
    // Save the index of the question
    correctAnswerIndex = chosenQuestion.choices.indexOf(answer);

    // Updating the questions in the form
    document.getElementById('question').textContent = chosenQuestion.question;

    // Update the options form
    document.querySelector('label[for=option-1]').textContent = chosenQuestion.choices[0];
    document.querySelector('label[for=option-2]').textContent = chosenQuestion.choices[1];
    document.querySelector('label[for=option-3]').textContent = chosenQuestion.choices[2];
    document.querySelector('label[for=option-4]').textContent = chosenQuestion.choices[3];
}

//  Making sure it is the correct answer and then showing it on the page
function correctAnswerCheck() {
    // Correct Answer message
    if (providedAnswerIndex == correctAnswerIndex) {
        feedback.textContent = 'Your answer was correct.';
        deductPoints = false;
    }
    // Wrong Answer message
    else {
        feedback.textContent = 'Your answer was incorrect! We have deducted ' + deductedTime + ' seconds from the timer.';
        deductPoints = true;
    }
}

// Saving the person's score
function saveScore() {
    if (!userScores) {
        userScores = [];
    }
    userScores.push(userInfo);
    localStorage.setItem("userScores", JSON.stringify(userScores));
}

// Showing the recent scores
function displayScores() {
    title.textContent = "Recent Scores";
    viewScores.style.display = "none";
    form.style.display = "none";
    timerDisplay.style.display = "none";
    submitScoreButton.style.display = "none";
    clearScoresButton.style.display = "block";

    // Displaying the submitScoreButton if the person has not submitted their score yet
    if (counter2 == 0) {
        submitScoreButton.style.display = "block";
    }

    headerText.textContent = '';

    // Showing most recent scores
    for (var i = 0; i < userScores.length; i++) {
        headerText.textContent += userScores[i].name + " had a score of " + userScores[i].score + ". " + "| ";
    }
}

// Clearing the recent scores from localStorage
function clearScores() {
    localStorage.clear();
    submitScoreButton.style.display = "none"
    headerText.textContent = 'Scores have been cleared';
}

// The beginning of the quiz application's script Below

// Updating the name key value in the userInfo
userInfo.name = window.prompt("What is your name?", "Sally Ride");

//Hiding form, submitScoreButton, and clearScoreButton
form.style.display = "none";
submitScoreButton.style.display = "none";
clearScoresButton.style.display = "none";

// Show the recent scores
viewScores.addEventListener('click', function() {
// Recent Scores to show from the localStorage
if (JSON.parse(localStorage.getItem("userScores"))) {
    counter2++;
    displayScores();
}

// No recent scores to be shown from the localStorage
else {
    window.alert("No recent scores to show.")
}
});

// Event Listeners Below

// Showing the form
startButton.addEventListener('click', function(){
    // Counter for the submitScoreButton
    counter2 = 0;

    // Updating the description of the page and the title of the page
    title.textContent = "The Basics of Coding Quiz!";
    headerText.textContent = "Greetings Earthlings! Take this quiz to test your knowledge on some of the basic knowledge in coding. Be mindful that for each time you get an answer wrong, 10 seconds will be deducted from the total time you have to take the quiz!"
    
    // Updating the question and answer options in the form
    updateQuestion();

    viewScores.style.display = "block";
    timerDisplay = "block";

    // Hiding the start button from view
    startButton.style.display = "none";

    // Display the form
    form.style.display = "block";

    // The timer will start when it is clicked
    userInfo.score = startTimer(time, timerDisplay);
});

// Submitting the data from the form
form.addEventListener('submit', function(event){
    // prohibit the default event behaviors
    event.preventDefault();

    // Getting form DOM Elements
    var firstOption = document.getElementById("option-1");
    var secondOption = document.getElementById("option-2");
    var thirdOption = document.getElementById("option-3");
    var fourthOption = document.getElementById("option-4");

    // When the 1st option is chosen
    if (firstOption.checked){
        providedAnswerIndex = firstOption.value;
        correctAnswerCheck();
        firstOption.checked = false;
    }

    // When the 2nd option is chosen
    if (secondOption.checked){
        providedAnswerIndex = secondOption.value;
        correctAnswerCheck();
        secondOption.checked = false;
    }

    // When the 3rd option is chosen
    if (thirdOption.checked){
        providedAnswerIndex = thirdOption.value;
        correctAnswerCheck();
        thirdOption.checked = false;
    }

    // When the 4th option is chosen
    if (fourthOption.checked){
        providedAnswerIndex = fourthOption.value;
        correctAnswerCheck();
        fourthOption.checked = false;
    }

    counter++;

    if (counter < numberOfQuestions){
        // Change the question and answer choices in the form
        updateQuestion();
    }
});

// The test will clear and reset when the browser gets refreshed 
resetButton.addEventListener('click', function(){
    location.reload();
});

// Submitting the score of the person playing
submitScoreButton.addEventListener('click', function(){
    counter2++;
    saveScore();
    displayScores();
    viewScores.style.display = "none";
    timerDisplay.style.display = "none";
    feedback.style.display = "none";
    clearScoresButton.style.display = "block";
});

// Clearing the recent scores from the localStorage
clearScoresButton.addEventListener('click', function(){
    clearScores();
});