let userScore = 0;
let compScore = 0;
let gameOver = false;

const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");
const newGameButton = document.querySelector("#new-game-button");
const resetButton = document.querySelector("#reset-button");

function randChoice() {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
}

function drawGame() {
  msg.innerText = "Game was a draw. Play again.";
  msg.style.backgroundColor = "#BBBB3F";
}

function showWinner(userWin, userChoice, compChoice) {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You won! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  if (userScore === 5 || compScore === 5) {
    gameOver = true;
    msg.innerText = userScore === 5 ? "You won the match!!" : "Computer wins the match!!";
    msg.style.backgroundColor = userScore === 5 ? "blue" : "orange";

    disableChoices();
  }
}

function playGame(userChoice) {
  if (gameOver) return;

  const compChoice = randChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = false;
    if (
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper")
    ) {
      userWin = true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
}

function disableChoices() {
  choices.forEach(choice => {
    choice.style.pointerEvents = "none";
  });
}

function enableChoices() {
  choices.forEach(choice => {
    choice.style.pointerEvents = "auto";
  });
}

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (gameOver) return;
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

function startNewGame() {
  if (!gameOver) {
    msg.innerText = "Finish the current game first!";
    return;
  }
  userScore = 0;
  compScore = 0;
  gameOver = false;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Choose your option:";
  msg.style.backgroundColor = "initial";
  enableChoices();
}

function resetGame() {
  userScore = 0;
  compScore = 0;
  gameOver = false;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Game has been reset. Choose your option:";
  msg.style.backgroundColor = "initial";
  enableChoices();
}

newGameButton.addEventListener("click", startNewGame);
resetButton.addEventListener("click", resetGame);
