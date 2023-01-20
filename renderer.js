import Ball from "./Ball.js"
import Paddle from "./Paddle.js";

const startingMenu = document.getElementById("startingMenu");
const startButton = document.getElementById("startButton");
const settingButton = document.getElementById("settingButton");
const quitButton = document.getElementById("quitButton");
const settingScreen = document.getElementById("settingScreen");
const settingSaveBtn = document.getElementById("settingSaveBtn");
const gameScreen = document.getElementById("gameScreen");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const endScreen = document.getElementById("endScreen");
const endQuitButton = document.getElementById("endQuitButton");

const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");

const ball = new Ball(document.getElementById("ball"));
const pPaddle = new Paddle(document.getElementById("playerPaddle"));
const cPaddle = new Paddle(document.getElementById("computerPaddle"));

// game engine
let lastTime;
let end = false;
let difficulty = "easy";
function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime;
        end = ball.update(delta, [pPaddle.rect(), cPaddle.rect()], difficulty)
        cPaddle.update(delta, ball.y, difficulty);
    }

    lastTime = time;
    if(end == false){
        window.requestAnimationFrame(update);
    } 
}

// helper function for restarting new game
function reset() {
    lastTime = null;
    end = false;

    playerScore.innerHTML = 0;
    computerScore.innerHTML = 0;

    gameScreen.classList.remove("d-none");
    endScreen.classList.add("d-none");
}

// move paddle with mouse
document.addEventListener("mousemove", e => {
    if(e.y > (window.innerHeight * 10 / 100)){
       pPaddle.position = (e.y / window.innerHeight) * 100; 
    }
});

startButton.addEventListener("click", e => {
    startingMenu.classList.add("d-none");
    gameScreen.classList.remove("d-none");
    
    window.requestAnimationFrame(update);
});

tryAgainBtn.addEventListener("click", e => {
    reset();
    window.requestAnimationFrame(update);
});

quitButton.addEventListener("click", () => {
    window.program.quit();
});

endQuitButton.addEventListener("click", () => { 
    window.program.quit();
});

settingButton.addEventListener("click", () => {
    startingMenu.classList.add("d-none");
    settingScreen.classList.remove("d-none");
});

settingSaveBtn.addEventListener("click", () => {
    difficulty = document.querySelector('input[name="difficultyOptions"]:checked').value;

    settingScreen.classList.add("d-none");
    startingMenu.classList.remove("d-none");

    
});

