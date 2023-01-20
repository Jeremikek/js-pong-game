const SPEED = { "easy": 0.050, "medium": 0.150, "hard": 0.250 };

export default class Paddle {
    constructor(pElem) {
        this.pElem = pElem;
    }

    get position() {
        return parseFloat(getComputedStyle(this.pElem).getPropertyValue("--position"));
    }

    set position(value) {
        this.pElem.style.setProperty("--position", value);
    }

    rect() {
        return this.pElem.getBoundingClientRect();
    }

    update(delta, y, difficulty) {
        if(this.position < y){
            this.position += SPEED[`${difficulty}`] * delta;
        }else{
            this.position -= SPEED[`${difficulty}`] * delta;
        }
    }
}