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
        case 32:
            this.player.move();
            break;
      }
    };

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

      if (this.framesCounter % 50 === 0) {
        this.generateObstacle();
      }

      this.moveAll();
      this.drawAll();

      this.clearObstacles();
    }, 1000 / this.fps);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  // TODO
  gameOver: function() {
    this.stop();

    if (confirm("GAME OVER. Play again?")) {
      this.reset();
      this.start();
    }
  },
  reset: function() {
    this.background = new Background(
      this.canvas.width,
      this.canvas.height,
      this.ctx
    );
    this.timer = new Timer(this.canvas.width, this.canvas.height, this.ctx);
    this.player = new Player(
      this.canvas.width,
      this.canvas.height,
      this.ctx,
      this.keys
    );
    this.enemyHorde = new Horde([
      new FemaleZombie(
        this.canvas.width,
        this.canvas.height,
        this.ctx,
        0.00000001,
        0.5
      ),
      new MaleZombie(
        this.canvas.width,
        this.canvas.height,
        this.ctx,
        0.07,
        0.6
      ),
      new FemaleZombie(
        this.canvas.width,
        this.canvas.height,
        this.ctx,
        0.00000001,
        0.7
      )
    ]);
    this.obstacles = [];
    this.framesCounter = 0;
    this.timeCounter = 0;
  },
  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
  },
  generateObstacle: function() {
    this.obstacles.push(
      new Obstacle(this.canvas.width, this.player.y0, this.player.h, this.ctx)
    );
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function() {
    this.background.draw();
    this.timer.draw(this.timeCounter);
    this.player.draw(this.framesCounter);
    this.enemyHorde.draw(this.framesCounter);
    this.obstacles.forEach(function(obstacle) {
      obstacle.draw();
    });
  },
  moveAll: function() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function(obstacle) {
      obstacle.move();
    });
  }
};
