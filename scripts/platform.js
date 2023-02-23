import game from "./game.js"

const platform = {
    velocity: 18,
    initVelocity: 20,
    dx: 0,

    initX: 280,
    initY: 1000,
    x: 280,
    y: 1000,
    lastX: 280,
    lastY: 1000,

    initWidth: 128,
    initHeight: 32,
    width: 128,
    height: 32,
    setDir(direction) {
        if (direction === 'L' && this.x > 0) this.dx = -this.velocity
        if (direction === 'R' && (this.x + this.width < game.width)) this.dx = this.velocity
        if (!direction) this.dx = 0
    },
    move() {
        if (this.dx) {
            this.x += this.dx
            this.lastX = this.x / game.widthScale
        }
    },
    getTouchOffset(x) {
        let diff = (this.x + this.width) - x;
        let offset = this.width - diff
        let result = 2 * offset / this.width
        return result - 1
    },
    collideBounds() {
        let x = this.x + this.dx

        let platformLeft = x
        let platformRight = platformLeft + this.width

        let worldLeft = 0
        let worlRight = game.width

        if(platformLeft < worldLeft || platformRight > worlRight) {
            this.dx = 0
        }

    },
}

export default platform