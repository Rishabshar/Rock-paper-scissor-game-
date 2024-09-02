let userScore = 0;
let compScore = 0;
let gameOver = false;

const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");
const newGameButton = document.querySelector("#new-game-button");

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

    // Check if either the user or computer has reached a score of 5
    if (userScore === 5 || compScore === 5) {
        gameOver = true; // Set gameOver to true
        msg.innerText = userScore === 5 ? "You won!! Computer wins!!" : "Computer wins!!";
        msg.style.backgroundColor = userScore === 5 ? "blue" : "orange"; // Optional: Different colors for win/lose

        // Disable choice buttons when the game is over
        choices.forEach(choice => {
            choice.disabled = true;
        });
    }
}

function playGame(userChoice) {
    if (gameOver) return; // Stop the game if it's over

    // Generate computer choice
    const compChoice = randChoice();

    // Draw outcome
    if (userChoice === compChoice) {
        drawGame();
    } else {
        // Determine the winner
        let userWin = false;
        if (
            (userChoice === "rock" && compChoice === "scissors") ||
            (userChoice === "paper" && compChoice === "rock") ||
            (userChoice === "scissors" && compChoice === "paper")
        ) userWin = true;

        showWinner(userWin, userChoice, compChoice);
    }
}

// Add event listeners to the choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (gameOver) return; // Stop processing clicks if the game is over
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Function to start a new game
function startNewGame() {
    if (!gameOver) {
        msg.innerText = "Finish the current game first!";
        return;
    }
    // Reset game variables to start a new game
    userScore = 0;
    compScore = 0;
    gameOver = false;

    // Update UI elements
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Choose your option:";
    msg.style.backgroundColor = "initial"; // Reset to default color

    // Enable the choice buttons for a new game
    choices.forEach(choice => {
        choice.disabled = false;
    });
}

// Add event listener to the New Game button
newGameButton.addEventListener("click", startNewGame);

// Function to reset the game
function resetGame() {
    // Reset game variables
    userScore = 0;
    compScore = 0;
    gameOver = false;

    // Update UI elements
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Game has been reset. Choose your option:";
    msg.style.backgroundColor = "initial"; // Reset to default color

    // Enable the choice buttons
    choices.forEach(choice => {
        choice.disabled = false;
    });
}

// Add event listener to the Reset button
//const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);
