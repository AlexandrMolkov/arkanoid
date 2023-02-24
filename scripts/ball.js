import game from "./game.js"
import platform from "./platform.js"

const ball = {
    initX: 320,
    initY: 272,
    x: 320,
    y: platform.y - 30,
    initWidth: 30,
    initHeight: 30,
    width: 36,
    height: 36,
    velocity: 12,
    dx: 0,
    dy: 0,
    onPlatform: true,

    start() {
        console.log('start')
        if(this.onPlatform) {
            this.onPlatform = false
            this.dy = -this.velocity
            this.dx = game.random(-this.velocity, this.velocity)
            this.onPlatform = false
        }
        
    },
    move() {
        if (this.onPlatform) {
            this.x = game.platform.x + game.platform.width/2
        }
        if (this.dy) {
            this.y += this.dy
        }
        if (this.dx) {
            this.x += this.dx
        }
    },
    collide(object) {
        let x = this.x + this.dx;
        let y = this.y + this.dy;

        if (x + this.width > object.x &&
            x < object.x + object.width &&
            y + this.height > object.y &&
            y < object.y + object.height) {
            return true
        }
        return false
    },
    bumpBlock(block) {
        this.dy *= -1
        block.active = false
    },
    bumpPlatform(platform) {
        if(platform.dx) {
            this.x += platform.dx
        }

        if(this.dy > 0) {       // если мяч оттолкнулся то не проверять
            this.dy = !this.onPlatform ? -this.velocity : 0
            let touchX = this.x + this.width / 2
            this.dx = this.velocity * platform.getTouchOffset(touchX)
        }
    },
    collideBounds() {
        let x = this.x + this.dx
        let y = this.y + this.dy

        let ballLeft = x
        let ballRight = ballLeft + this.width
        let ballTop = y
        let ballBottom = ballTop + this.height

        let worldLeft = 0
        let worldRight = game.width
        let worldTop = 0
        let worldBottom = game.height

        if(ballLeft < worldLeft) {
            this.x = 0
            this.dx = this.velocity
        } else if(ballRight > worldRight ) {
            this.x = worldRight - this.width
            this.dx = -this.velocity
        } else if(ballTop < worldTop) {
            this.y = 0
            this.dy = this.velocity
        } else if (ballBottom > worldBottom) {

            game.sounds.bumpB.pause();
            game.sounds.bumpB.currentTime = 0;
            game.sounds.bumpB.play()

            if(game.lives > 0){
                game.livesRemove()
                this.ballToStartPosition()
            } else {
                game.gameOver()
            }

        }

    },

    ballToStartPosition() {
        this.onPlatform = true
        this.x = 320
        this.y = platform.y - 30
        this.dy = 0
        this.dx = 0
    },
    
}

export default ball