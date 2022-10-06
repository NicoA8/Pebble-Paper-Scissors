// VALUES
let playerScore = 0;
let computerScore = 0;
//----------------------------------------------------------------------
// DOM ELEMENTS
// Naming User and Computer Scores to update
const userScore = document.querySelector(".user-score");
const pcScore = document.querySelector(".computer-score");
const scoreInfo = document.querySelector(".result");

// User Choice
const userPebble = document.querySelector(".user .pebble");
const userPaper = document.querySelector(".user .paper");
const userScissors = document.querySelector(".user .scissors");

// PC Choice
const computerPebble = document.querySelector(".pc .pebble");
const computerPaper = document.querySelector(".pc .paper");
const computerScissors = document.querySelector(".pc .scissors");

// Game Over Page
// Function to refresh page
const gameOverLose = document.querySelector(".game-over.lose");
const gameOverWin = document.querySelector(".game-over.win");
const refreshBtns = document.querySelectorAll(".game-over button");
refreshBtns.forEach((refreshBtn) => {
    refreshBtn.addEventListener("click", () => {
        window.location.reload();
    });
});
//----------------------------------------------------------------------
// FUNCTIONS
// COMPUTER CHOICE
function computerPlay() {
    let choices = ["pebble", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}
// Removing Chosen from UserChoice and PcChoice
function removeChosen() {
    computerPebble.classList.remove("chosen");
    computerPaper.classList.remove("chosen");
    computerScissors.classList.remove("chosen");
}

function removeUserChosen() {
    userPebble.classList.remove("chosen");
    userPaper.classList.remove("chosen");
    userScissors.classList.remove("chosen");
}
function removeScore() {
    pcScore.classList.remove("score");
    userScore.classList.remove("score");
}
// PC selects an item, then adding and removing animation(chosen) to computerChoice
function computerChosen(choice) {
    if (choice === "pebble") {
        removeChosen();
        computerPebble.classList.add("chosen");
    }
    if (choice === "paper") {
        removeChosen();
        computerPaper.classList.add("chosen");
    }
    if (choice === "scissors") {
        removeChosen();
        computerScissors.classList.add("chosen");
    }
}
// SHOW GAME RESULT (WIN OR LOSE BANNER)
function gameIsOver(match) {
    match.style.display = "grid";
}
//----------------------------------------------------------------------
// MAIN GAME FUNCTION
function playGame(playerSelection, computerSelection) {
    // UserSelection
    playerSelection = this.dataset.button;

    // PcSelection
    computerSelection = computerPlay();

    // Animation
    removeUserChosen();
    this.classList.add("chosen");

    // Created  result to show outcome of every match
    let result = "";
    if (
        (playerSelection == "pebble" && computerSelection == "scissors") ||
        (playerSelection == "scissors" && computerSelection == "paper") ||
        (playerSelection == "paper" && computerSelection == "pebble")
    ) {
        computerChosen(computerSelection);
        playerScore += 1;
        result = "You won!";
        userScore.innerHTML = playerScore;

        if (playerScore == 5) {
            gameIsOver(gameOverWin);
        }
    } else if (playerSelection == computerSelection) {
        result = "It's a tie!";
        computerChosen(computerSelection);
    } else {
        computerChosen(computerSelection);
        computerScore += 1;
        result = "You lost!";
        pcScore.innerHTML = computerScore;
        if (computerScore == 5) {
            gameIsOver(gameOverLose);
        }
    }
    // Change outcome with animation
    scoreInfo.innerHTML = result;
    scoreInfo.classList.add("score");
    setTimeout(() => {
        scoreInfo.classList.remove("score");
    }, 1000);
}
//----------------------------------------------------------------------
// BEGIN GAME
userPebble.addEventListener("click", playGame);
userPaper.addEventListener("click", playGame);
userScissors.addEventListener("click", playGame);
