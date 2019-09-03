var Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,

    init: function(canvasId) {

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.start();
    },
    start: function() {

        this.reset();

        let pause = false;

        window.onkeydown = function(e) {
          switch (e.keyCode) {
            // 'esc' to pause
            case 27:
                pause = true;
                break;
            // 'enter' to continue
            case 13:
                pause = false;
                break;
          }
        }

        this.interval = setInterval(() => {

            if (pause) return;

            this.clear();

            this.framesCounter++;
            this.timeCounter++;

            if (this.framesCounter > 1000) {
                this.framesCounter = 0;
            }

            
            // TODO if ()
            // cambiar el num del que haces modulo
            // para regular el numero de obstaculos
            // en base al tiempo que ha transcurrido

            // if (this.framesCounter % 50 === 0) {
            // this.generateObstacle();
            // }
      
            this.moveAll();
            this.drawAll();
        }, 1000 / this.fps);
    },
    stop: function() {
        clearInterval(this.interval);
    },
    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
        this.timer = new Timer(this.canvas.width, this.canvas.height, this.ctx);
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys);
        this.enemyHorde = new Horde([
            new FemaleZombie(this.canvas.width, this.canvas.height, this.ctx, 0.00000001, 0.5),
            new MaleZombie(this.canvas.width, this.canvas.height, this.ctx, 0.07, 0.60),
            new FemaleZombie(this.canvas.width, this.canvas.height, this.ctx, 0.00000001, 0.7)
        ]);
        this.framesCounter = 0;
        this.timeCounter = 0;

    },
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
    drawAll: function() {
        this.background.draw();
        this.timer.draw(this.timeCounter);
        this.player.draw(this.framesCounter);
        this.enemyHorde.draw(this.framesCounter);
        
    },
    moveAll: function() {
        this.background.move();
    }
}