export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide)
        this.wrapper = document.querySelector(wrapper);
        this.dist = {
            finalPosition: 0,
            startX: 0,
            movement: 0
        }
    }

    onStart(event) {
        event.preventDefault();
        console.log(event)
        this.dist.startX = event.clientX;
        this.wrapper.addEventListener('mousemove', this.onMove);
    }

    updatePosition(clientX) {
        this.dist.movement = (this.dist.startX - clientX) * 1.5;
        return this.dist.finalPosition - this.dist.movement;
    }

    moveSlide(distX) {
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    onMove(event) {
        const finalPosition = this.updatePosition(event.clientX);
        this.moveSlide(finalPosition);

    }

    onEnd(event) {
        this.wrapper.removeEventListener('mousemove', this.onMove);

    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
    }

    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }
}