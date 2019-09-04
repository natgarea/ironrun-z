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

    let keyboard = new Keys(this.player);
    keyboard.setEventListeners();

    this.interval = setInterval(() => {
      if (keyboard.pause) return;

      this.clear();

      this.framesCounter++;
      this.timeCounter++;
      // console.log(this.timeCounter);

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      // let difficulty = d3.scaleLinear().domain([0,max]).range([100,50]);
      this.obstacleTimer = +this.timer.minutes * 60 + +this.timer.seconds;
      this.increaseDifficulty(this.obstacleTimer);

      this.moveAll();
      this.drawAll();

      this.clearObstacles();
    }, 1000 / this.fps);
  },
  randomTimer: function(num) {
    // Calculate
    // 50 frames must be the minimum to play
    let max = 30000 / this.fps;
    let difficulty = d3
      .scaleLinear()
      .domain([0, max])
      .range([100, 50]);
    return difficulty(num);
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
  // por pantalla le puedo pasar (timer, tiempoInicial)
  // en el 1: empieza en 0 segundos, en el 2: con la dificultad a partir de 60
  increaseDifficulty: function(timer) {
    if (this.obstacleTimer > 0 && this.obstacleTimer < 10) {
      if (this.framesCounter % 100 === 0) {
        this.generateObstacle();
      }
    }
    if (this.obstacleTimer > 10 && this.obstacleTimer < 30) {
      console.log(this.obstacleTimer);
      if (this.framesCounter % 80 === 0) {
        this.generateObstacle();
      }
    }
    if (this.obstacleTimer > 30 && this.obstacleTimer < 60) {
      console.log(this.obstacleTimer);
      if (this.framesCounter % 60 === 0) {
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
      obstacle.drawStatic();
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
