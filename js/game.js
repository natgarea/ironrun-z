var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  obstacleTimer: 0,
  gameStarted: false,
  lostGame: false,

  init: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.start();
    this.canvas.onclick = () => (this.gameStarted = true);
  },
  start: function() {
    this.reset();

    this.keyboard.setEventListeners();

    this.interval = setInterval(() => {
      if (this.keyboard.pause) {
        this.pauseScr.draw(this.ctx);
        return;
      }

      this.clear();

      this.framesCounter++;
      if (!this.player.isDead) {
        this.timeCounter++;
      }

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.gameStarted) {
        this.obstacleTimer = +this.timer.minutes * 60 + +this.timer.seconds;
        this.gameRythm(this.obstacleTimer);

        this.moveAll();
        this.drawAll();

        this.clearObstacles();

        isPlayerCollision(this.obstacles, this.player, this);
        isZombieCollision(this.obstacles, this.enemyHorde, this.player);
        if (this.player.isDead) {
          this.enemyHorde.attack(this.player.x);
        }
      } else {
        this.startScr.draw(this.ctx);
      }
    }, 1000 / this.fps);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  gameOver: function() {
    this.player.die();
    this.zombieTalk.play();
    setTimeout(() => {
      this.stop();
      this.gameOverScr.draw(this.ctx);
    }, 2000);
  },
  reset: function() {
    this.startScr = new StartScreen(
      this.canvas.width,
      this.canvas.height
    );
    this.background = new City(
      this.canvas.width,
      this.canvas.height
    );
    this.timer = new Timer(this.canvas.width, this.canvas.height, this.ctx);
    this.player = new Player(this.canvas.width, this.canvas.height, this.ctx);
    this.keyboard = new Controls(this.player);
    this.enemyHorde = new Horde([
      new FemaleZombie(
        this.canvas.width,
        this.canvas.height,
        0.00000001,
        0.5
      ),
      new MaleZombie(
        this.canvas.width,
        this.canvas.height,
        0.07,
        0.6
      ),
      new FemaleZombie(
        this.canvas.width,
        this.canvas.height,
        0.00000001,
        0.7
      )
    ]);
    this.obstacles = [];
    this.framesCounter = 0;
    this.timeCounter = 0;
    this.zombieTalk = new Talk();
    this.gameOverScr = new GameOver(
      this.canvas.width,
      this.canvas.height,
    );
    this.pauseScr = new PauseScreen(
      this.canvas.width,
      this.canvas.height,
    );
  },
  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
  },
  generateObstacle: function() {
    this.obstacles.push(
      new Brains(this.canvas.width, this.player.y0, this.player.h, this.ctx)
    );
  },
  gameRythm: function(timer) {
    if (timer > 0 && timer <= 10 && !this.player.isDead) {
      if (this.framesCounter % 100 === 0) {
        this.generateObstacle();
      }
    }
    if (timer > 10 && timer <= 30 && !this.player.isDead) {
      if (this.framesCounter % 50 === 0) {
        this.generateObstacle();
      }
    }
    if (timer > 30 && timer <= 100 && !this.player.isDead) {
      if (this.framesCounter % 100 === 0) {
        this.generateObstacle();
      }
    }
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function() {
    this.background.draw(this.ctx);
    this.timer.draw(this.timeCounter);
    this.player.draw(this.framesCounter);
    this.enemyHorde.draw(this.framesCounter, this.ctx);
    this.obstacles.forEach(function(obstacle) {
      obstacle.draw();
    });
  },
  moveAll: function() {
    this.background.move(this.player.isDead);
    this.player.move();
    this.obstacles.forEach(function(obstacle) {
      obstacle.move();
    });
  }
};
