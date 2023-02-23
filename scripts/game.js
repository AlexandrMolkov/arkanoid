import ball from "./ball.js"
import platform from "./platform.js"
import {uiWrapper, uiLives, uiCount, buttonStart, showMenu} from "./ui.js"
import levels from "./levels.js"

console.log(levels.length)

const canvas = document.querySelector('#gameCanvas')
const area = document.querySelector('#gameArea')
canvas.width = 720
canvas.height = 1280

buttonStart.addEventListener('click', e => {
    game.inMenu = false
    game.running =  true
    game.run()
})

const game = {
    inMenu: true,
    running: false,
    score: 0,
    lives: 3,
    initWidth: canvas.width,
    initHeight: canvas.height,
    width: 0,
    height: 0,
    ctx: null,
    backgrounds: null,
    background: null,
    ball,
    platform,
    loaded: false,
    widthScale: 1,
    blocks: [],
    blocksCount: 0,
    currentLevel: 0,
    levels,

    sprites: {
        platform: null,
        ball: null,
        background: null,
        block: {
            blue: null,
            green: null,
            red: null,
            violet: null,
            yellow: null,
        },
    },
    objects: [

    ],
    sounds: {
        bump: null
    },
    setEvents() {
        window.addEventListener('keydown', e => {

            if(!this.inMenu) {
                if (e.key === 'a' || e.key === 'ArrowLeft') {
                    this.platform.setDir('L')
                }
                if (e.key === 'd' | e.key === 'ArrowRight') {
                    this.platform.setDir('R')
                }
                if (e.code === 'Space') {
                    if(this.ball.onPlatform === true) {
                        this.ball.start()
                    }
                }

                if (e.code === 'Escape') {
                    this.inMenu = true,
                    this.running = false
                    showMenu(this.run)
                }
    
                this.render()
            }
            

        })
        window.addEventListener('keyup', e => {
            this.platform.setDir()
        })

    },
    init() {
        
        this.ctx = document.querySelector('#gameCanvas').getContext('2d')
        this.setEvents()
        this.createBlocks()
    },
    createBlocks() {

        let blockX = 4
        let blockY = 42
        for (let i = 0 ; i < this.levels[this.currentLevel].length; i++) {
            for (let j = 0; j < this.levels[this.currentLevel][i].length; j++) {
                if(this.levels[this.currentLevel][i][j] !== '0'){

                    this.blocks.push({
                        width: canvas.width / 10,
                        height: 32,
                        x: blockX,
                        y: blockY,
                        lastX: blockX,
                        lastY: blockY,
                        active: true,
                        color: this.levels[this.currentLevel][i][j],
                    })
                }

               blockX += canvas.width / 9
               //blockX += 68
            }
            blockX = 4
            blockY += 42
        }
        this.blocksCount = this.blocks.length

    },
    preload() {
        this.backgrounds = {
            width: 2560,
            lvl1: 'assets/backgroundTest.jpg'
        }
        this.sprites.background = new Image()
        this.sprites.background.src = this.backgrounds.lvl1

        this.sprites.ball = new Image()
        this.sprites.ball.src = 'assets/ball.png'

        this.sprites.platform = new Image()
        this.sprites.platform.src = 'assets/platform.png'

        this.sprites.block.blue = new Image()
        this.sprites.block.blue.src = 'assets/brick_blue.png'
        this.sprites.block.green = new Image()
        this.sprites.block.green.src = 'assets/brick_green.png'
        this.sprites.block.red = new Image()
        this.sprites.block.red.src = 'assets/brick_red.png'
        this.sprites.block.violet = new Image()
        this.sprites.block.violet.src = 'assets/brick_violet.png'
        this.sprites.block.yellow = new Image()
        this.sprites.block.yellow.src = 'assets/brick_yellow.png'
        
        this.sounds.bump = new Audio('assets/bump.mp3')

        this.loaded = true

    },
    render() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.ctx.drawImage(this.sprites.ball, this.ball.x, this.ball.y, this.ball.width, this.ball.height)
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y, this.platform.width, this.platform.height)
        this.renderBlocks()
        canvas.style.cssText = `
            aspect-ratio: 9/16;
            max-height: 100vh;
            max-width: 100vw;
            display: block;
            margin-left: auto;
            margin-right: auto;
        `
        canvas.style.marginTop = (window.innerHeight - canvas.offsetHeight) / 2 + 'px'
        uiWrapper.style.cssText = `
        max-height: ${(canvas.offsetHeight/100)*5}px;
        max-width: ${canvas.offsetWidth}px;
        font-size: ${(canvas.offsetHeight/100)*5}px;
        
      `
    },
    defineBlockColor(c) {
        switch (c) {
            case 'B':
                return this.sprites.block.blue
            case 'G':
                return this.sprites.block.green
            case 'R':
                return this.sprites.block.red
            case 'V':
                return this.sprites.block.violet
            case 'Y':
                return this.sprites.block.yellow
            default:
                return this.sprites.block.blue;
        }
    },
    renderBlocks() {
        
        for (let block of this.blocks) {
            if(block.active) {
                this.ctx.drawImage(this.defineBlockColor(block.color), block.x, block.y, block.width, block.height);
            }
            
        }
        
    },
    addScore(){
        this.score +=1
        if(!this.blocksCount) {
            this.nextLevel()

        }
        uiCount.innerText = this.score
    },
    nextLevel() {
        if(this.currentLevel < this.levels.length-1) {
            this.currentLevel++
            this.blocks.splice(0, this.blocks.length)
            this.createBlocks()
            this.ball.ballToStartPosition()
        } else{
            this.running = false
            console.log('you are win')
        }

        
    },
    livesAdd(c = 1){
        this.lives += c
        uiLives.innerText = this.lives
    },
    livesRemove(c = 1){
        this.lives -= c
        uiLives.innerText = this.lives
    },
    update() {
        this.platform.move()
        this.ball.move()

        // collide blocks
        for (let block of this.blocks) {
            if(block.active && this.ball.collide(block)){
                this.sounds.bump.play()
                this.ball.bumpBlock(block)
                this.blocksCount -= 1
                this.addScore()
            }
        }
        // collide platform
        if(this.ball.collide(this.platform)) {
            this.ball.bumpPlatform(this.platform)
        }

        // collide bounds
        this.ball.collideBounds()

        // collide platform
        this.platform.collideBounds()
    },
    run() {
        window.requestAnimationFrame(() => {

            if(this.running) {
                this.update()
                this.render()
                this.run()
            }
            
        })
    },

    start() {
        this.init()
        this.preload()
        let interval = setInterval(() => {
            if (this.loaded) {
                this.run()
                clearInterval(interval)
            }
        }, 0);
        uiLives.innerText = this.lives
    },
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },
    gameOver() {
        game.running = false
        window.location.reload()
    }
}

canvas.addEventListener("touchstart", function (e) {

    game.ball.start()

});

canvas.addEventListener("touchend", function (e) {
}, false);

canvas.addEventListener("touchmove", function (e) {

    const touch = e.touches[0];
    const x = touch.pageX;
    const y = touch.pageY;
    // or taking offset into consideration
    const x_2 = touch.pageX - canvas.offsetLeft;
    const y_2 = touch.pageY - canvas.offsetTop;
    const platformCenter =  game.platform.width*0.5

    
    const scaleWidth = canvas.offsetWidth / (canvas.width/100)
    const percentCanvasToArea = canvas.width / ( area.offsetWidth/100)
   // const percentCanvasToArea = canvas.width * (scaleWidth/100) / ( area.offsetWidth/100)
    const scaleHeight = canvas.height / ( area.offsetHeight/100)
    console.log(scaleHeight)
    

    //if(percentCanvasToArea >= 100 && scaleWidth >= 100 && area.offsetWidth >= canvas.width) {
    if(!window.orientation) {
   /* if(scaleHeight >= 100 && percentCanvasToArea >= 100) {
    const xxx = (area.offsetWidth / (canvas.offsetWidth/100)/100)
    game.platform.x = (x * xxx) - (canvas.offsetLeft * xxx) - platformCenter
   }
   else  *//* if(percentCanvasToArea >= 100 && scaleHeight >= 100 && area.offsetHeight >= canvas.offsetHeight) { */
        console.log('if')
        
        game.platform.x = (x * percentCanvasToArea/100) - platformCenter

    } else if (scaleHeight >= 100 && window.orientation) {
        console.log('else if')
        //console.log(area.offsetWidth / (canvas.offsetWidth/100))
        const xxx = (area.offsetWidth / (canvas.offsetWidth/100)/100)
        game.platform.x = (x * xxx) - (canvas.offsetLeft * xxx) - platformCenter

    } else {
        console.log('else')
        //console.log( game.platform.x)
        game.platform.x = x_2 - platformCenter
        //game.platform.x = (x * ((canvas.width * (scaleHeight/100)) / ( area.offsetWidth/100))/100) - platformCenter
        //console.log((x * ((canvas.offsetWidth / (canvas.width/100)/100)) * ((area.offsetWidth/100)/100)))
        //console.log(percentCanvasToArea)
        //game.platform.x = (x * (canvas.offsetWidth / ( canvas.width/100)/100)) - platformCenter
        //game.platform.x = (x * percentCanvasToArea/100) - platformCenter
        //console.log(x * ((scaleWidth/100) * (canvas.width / ( area.offsetWidth/100))) )
        //console.log((canvas.width * (scaleWidth/100) / ( area.offsetWidth/100)/100))
    }
    
});
window.addEventListener("orientationchange", function() {
    //console.log(window.orientation);
}, false);

window.scrollTo(0,1);

window.addEventListener('scroll', (e) => {
    e.preventDefault()
})


game.width = 720
game.height = 1280

export default game

