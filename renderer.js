import Ball from "./Ball.js"
import Paddle from "./Paddle.js";

const startingMenu = document.getElementById("startingMenu");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");

const ball = new Ball(document.getElementById("ball"));
const pPaddle = new Paddle(document.getElementById("playerPaddle"));
const cPaddle = new Paddle(document.getElementById("computerPaddle"));

// game engine
let lastTime;
let end;
function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime;
        end = ball.update(delta, [pPaddle.rect(), cPaddle.rect()])
        cPaddle.update(delta, ball.y);
    }

    lastTime = time;
    if(end !== false){
        window.requestAnimationFrame(update);
    } 
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

