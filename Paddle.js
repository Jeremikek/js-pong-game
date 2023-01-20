const SPEED = 0.050;

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

    update(delta, y) {
        if(this.position < y){
            this.position += SPEED * delta;
        }else{
            this.position -= SPEED * delta;
        }
    }
}