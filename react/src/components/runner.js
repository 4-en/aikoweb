import React from 'react';

import '../css/runner.css';


class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width || Math.random() * 50 + 10;
        this.height = height || Math.random() * 100 + 20;
        // random color
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    draw(ctx, position) {
        ctx.fillStyle = this.color;
        let canvasBottom = ctx.canvas.height;
        ctx.fillRect(this.x - position, canvasBottom - this.height - this.y, this.width, this.height);
    }

    tick() {
    }

    isColliding(player) {
        if(player.x + player.width < this.x) {
            return false;
        }
        if(player.x > this.x + this.width) {
            return false;
        }
        console.log(player.y);
        console.log(this.y);
        try {
        if(player.y > this.y + this.height) {
            return false;
        }
        if(player.y + player.height < this.y) {
            return false;
        }
        } catch(e) {
            console.log(e);
        }
        console.log('collision');
        return true;
    }
}



const scaleVal = (i, start, end) => {
    if(i < 0) {
        return start;
    }
    if(i > 1) {
        return end;
    }
    return i * (end - start) + start;
};


class RunnerGame {
    constructor() {
        this.canvas = document.getElementById('runner-canvas');
        if(!this.canvas) {
            console.log('Error: canvas not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 600;

        // get screen width
        this.canvas.width = window.innerWidth;

        // set game state
        this.gameState = 'running';
        this.position = 0;
        this.height = 0;
        this.yVelocity = 0;
        this.speed = 2;
        this.obstacles = [];

        this.running = false;
        this.time = 0;
        this.usedDoubleJump = false;

        // bind spacebar
        window.addEventListener('keydown', (e) => {
            if(e.keyCode === 32) {
                this.onSpacebar();
            }
        }
        );

        // if mobile, bind touch
        if('ontouchstart' in window) {
            window.addEventListener('touchstart', () => this.onSpacebar());
        }

    }

    // game loop
    loop() {
        // resize canvas
        if(this.canvas.width !== window.innerWidth) {
            this.canvas.width = window.innerWidth;
        }

        // update game
        this.update();

        // draw game
        this.draw();

        if(this.running) {
            window.requestAnimationFrame(() => this.loop());
        }
    }

    // draw game
    draw() {

        // clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // player pos is 1/4 of the screen
        var playerX = this.canvas.width / 4;
        var drawPosition = this.position - playerX;

        // draw obstacles
        for(var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw(this.ctx, drawPosition);
        }

        // draw player
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(playerX, this.canvas.height - 50 - this.height, 50, 50);

        // draw score
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Score: ' + this.time, 10, 20);

        // draw game over
        if(this.gameState === 'gameover') {
            this.ctx.fillStyle = 'red';
            this.ctx.font = '100px Arial';
            this.ctx.fillText('Game Over', Math.max(0,this.canvas.width / 2 - 200), this.canvas.height / 2);
        }


    }

    reset() {
        this.gameState = 'running';
        this.position = 0;
        this.height = 0;
        this.speed = 2;
        this.obstacles = [];
        this.time = 0;
        this.start();
    }

    // jump
    jump() {
        if(this.height === 0 || !this.usedDoubleJump) {
            this.yVelocity = 7;

            if(this.height !== 0) {
                this.usedDoubleJump = true;
            }
        }
    }

    onSpacebar() {
        if(this.gameState === 'gameover') {
            this.reset();
        }
        else {
            this.jump();
        }
    }


    // update game
    update() {
        // update time
        this.time += 1;

        this.speed = scaleVal(this.time / 50000, 2, 10);

        // update position
        this.position += this.speed;

        // update height
        this.height += this.yVelocity;
        this.yVelocity -= 0.1;

        for(var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].tick();
        }

        // check for ground
        if(this.height < 0) {
            this.height = 0;
            this.yVelocity = 0;
            this.usedDoubleJump = false;
        }


        // remove obstacles that are off screen
        this.obstacles = this.obstacles.filter((obstacle) => {
            return obstacle.x + obstacle.width - this.position > -this.canvas.width / 3;
        });

        // add new obstacle if distance is greater than min distance
        let minDistance = scaleVal(this.speed / 5, 600, 200);
        let lastObstacle = this.obstacles[this.obstacles.length - 1];
        if(!lastObstacle || this.position + this.canvas.width - lastObstacle.x > minDistance) {
            if(Math.random() < 0.01) {
            this.obstacles.push(new Obstacle(this.canvas.width + this.position, 0));
            }
        }

        // check for collisions
        for(var i = 0; i < this.obstacles.length; i++) {
            if(this.obstacles[i].isColliding({
                x: this.position,
                y: this.height,
                width: 50,
                height: 50
            })) {
                this.gameState = 'gameover';
                this.stop();
            }
        }
    }

    // start game
    start() {
        this.running = true;
        this.loop();
    }

    // stop game
    stop() {
        this.running = false;
    }
};



// default runner component
const Runner = () => {


    

    // start game when component mounts
    // stop game when component unmounts
    React.useEffect(() => {
        var game = new RunnerGame();
        game.start();

        return () => {
            game.stop();
        };
    }, []);


    


        

    return (
        <div className='runner'>
            <canvas id='runner-canvas' width='300' height='600'></canvas>
        </div>
    );
};

export default Runner;