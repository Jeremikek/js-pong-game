const INITIAL_VELOCITY = { "easy": 0.025, "medium": 0.040, "hard": 0.055 };
const VELOCITY_INCREASE = { "easy": 0.01, "medium": 0.02, "hard": 0.03 };

const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const playerEndScore = document.getElementById("playerEndScore");
const computerEndScore = document.getElementById("computerEndScore");
const endText = document.getElementById("endText");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

export default class Ball {
    constructor(bElem) {
        this.bElem = bElem;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.bElem).getPropertyValue("--x"));
    }

    set x(value) {
        this.bElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.bElem).getPropertyValue("--y"));
    }

    set y(value) {
        this.bElem.style.setProperty("--y", value);
    }

    rect() {
        return this.bElem.getBoundingClientRect();
    }

    // initial configuration
    reset(difficulty) {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }; 
        }
        this.velocity = INITIAL_VELOCITY[`${difficulty}`];
    }

    update(delta, [player, computer], difficulty) {
        if(this.x == undefined || this.y == undefined){ 
            console.log("test"); 
            this.x = 50; 
            this.y = 50; 
        }

        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        const rect = this.rect();
        
        // if touches the top or bottom, flip direction and add speed
        if(rect.bottom >= window.innerHeight || rect.top <= window.innerHeight * 10 / 100){
            this.direction.y *= -1;
            this.velocity += VELOCITY_INCREASE[`${difficulty}`];
        }

        // if touches the paddle, flip direction and add speed
        if(
            (rect.right >= computer.left && (rect.bottom - computer.top >= 0 && rect.top - computer.bottom <= 0)) || 
            (rect.left <= player.right && (rect.bottom - player.top >= 0 && rect.top - player.bottom <= 0))
            ){
            this.direction.x *= -1;
            this.velocity += VELOCITY_INCREASE[`${difficulty}`];
        }

        // if ball touches the left end, reset and add point to computer
        if(rect.left <= 0){
            computerScore.innerHTML = parseInt(computerScore.innerHTML) + 1;
            this.reset(difficulty);

            if(parseInt(computerScore.innerHTML) < 10){
                return 1;
            }
            
        }
        // if ball touches the right end, reset and add point to player
        if(rect.right >= window.innerWidth){
            playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
            this.reset(difficulty);

            if(parseInt(playerScore.innerHTML) < 10){
                return 1;
            }
        }

        // if one side reached the matching point
        if(parseInt(playerScore.innerHTML) == 10 || parseInt(computerScore.innerHTML) == 10){
            if(parseInt(playerScore.innerHTML) == 10){
                endText.innerText = "You WON!"
            }else{
                endText.innerText = "You LOST!"
            }
            playerEndScore.innerText = parseInt(playerScore.innerHTML);
            computerEndScore.innerText = parseInt(computerScore.innerHTML);
            endScreen.classList.remove("d-none");
            gameScreen.classList.add("d-none");

            return 2;
        }

        return 0;
    }
} 
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;  
}