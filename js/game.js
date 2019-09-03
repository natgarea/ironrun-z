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

        this.interval = setInterval(() => {
            this.clear();

            this.framesCounter++;

            if (this.framesCounter > 1000) {
                this.framesCounter = 0;
              }
      
            this.moveAll();
            this.drawAll();
        }, 1000 / this.fps);
    },
    stop: function() {
        clearInterval(this.interval);
    },
    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys);
        this.enemyHorde = new Horde([
            new FemaleZombie(this.canvas.width, this.canvas.height, this.ctx, 0.00000001, 0.5),
            new MaleZombie(this.canvas.width, this.canvas.height, this.ctx, 0.07, 0.60),
            new FemaleZombie(this.canvas.width, this.canvas.height, this.ctx, 0.00000001, 0.7)
        ]);
        this.framesCounter = 0;

    },
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
    drawAll: function() {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.enemyHorde.draw(this.framesCounter);
    },
    moveAll: function() {
        this.background.move();
    }
}