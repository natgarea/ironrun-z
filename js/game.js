var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  obstacleTimer: 0,

  init: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.start();
  },

  start: function() {
    this.reset();

    let keyboard = new Controls(this.player);
    keyboard.setEventListeners();

    this.interval = setInterval(() => {
      if (keyboard.pause) return;

      this.clear();

      this.framesCounter++;
      if (!this.player.isDead) {
      this.timeCounter++;
      }

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      this.obstacleTimer = +this.timer.minutes * 60 + +this.timer.seconds;
      this.gameRythm(this.obstacleTimer);

      this.moveAll();
      this.drawAll();

      this.clearObstacles();

      this.isPlayerCollision();
      this.isZombieCollision();
      if(this.player.isDead){
        this.enemyHorde.attack(this.player.x, this.framesCounter);
      }
    }, 1000 / this.fps);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  // TODO
  gameOver: function() {
    
    this.player.isDead = true;
    this.player.die();
    this.zombieTalk.play();
    
    // this.stop();

    // if (confirm("GAME OVER. Play again?")) {
    //   this.reset();
    //   this.start();
    // }
  },
  reset: function() {
    this.background = new Background(
      this.canvas.width,
      this.canvas.height,
      this.ctx
    );
    this.timer = new Timer(this.canvas.width, this.canvas.height, this.ctx);
    this.player = new Player(this.canvas.width, this.canvas.height, this.ctx);
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
    this.scoreboard = [];
    this.zombieBite = new Bite();
    this.zombieTalk = new Talk();
  },
  isPlayerCollision: function() {
    for (var i = 0; i < this.obstacles.length; i++) {
      if (
        this.obstacles[i].x < this.player.x + this.player.w &&
        this.obstacles[i].x + this.obstacles[i].w > this.player.x &&
        this.obstacles[i].y < this.player.y + this.player.h &&
        this.obstacles[i].y + this.obstacles[i].h > this.player.y
      ) {
        this.obstacles.splice(i,1);
        this.gameOver();
      }
    }
  },
  isZombieCollision: function() {
    for (var i = 0; i < this.obstacles.length; i++) {
      if (
        this.obstacles[i].x < this.enemyHorde.enemies[2].x + this.enemyHorde.enemies[2].w &&
        this.obstacles[i].x + this.enemyHorde.enemies[2].w > this.enemyHorde.enemies[2].x &&
        this.obstacles[i].y < this.enemyHorde.enemies[2].y + this.enemyHorde.enemies[2].h &&
        this.obstacles[i].y + this.enemyHorde.enemies[2].h > this.enemyHorde.enemies[2].y
      && !this.player.isDead) {
        this.zombieBite.play();
        this.obstacles.splice(i,1);
      }
    }
  },
  clearObstacles: function() {
    // TODO
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
  },
  generateObstacle: function() {
    this.obstacles.push(
      new Brains(this.canvas.width, this.player.y0, this.player.h, this.ctx)
    );
  },
  // por pantalla le puedo pasar (timer, tiempoInicial)
  // en el 1: empieza en 0 segundos, en el 2: con la dificultad a partir de 60
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
    this.background.draw();
    this.timer.draw(this.timeCounter);
    this.player.draw(this.framesCounter);
    this.enemyHorde.draw(this.framesCounter);
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
