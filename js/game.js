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

            this.moveAll();
            this.drawAll();
        }, 1000 / this.fps);
    },
    stop: function() {

        clearInterval(this.interval);
    },
    reset: function() {
        console.log("reset");
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
    },
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
    drawAll: function() {
        this.background.draw();
    },
    moveAll: function() {
        this.background.move();
    }
}