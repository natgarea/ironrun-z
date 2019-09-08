class Screen {
  constructor(canvasWidth, canvasHeight) {
    this.img = new Image();

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.canvasWidth / 7,
      this.canvasHeight / 5,
      this.img.width,
      this.img.height
    );
  }
}

class StartScreen extends Screen {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth, canvasHeight);
    this.img.src = "./img/startScreen.png";
  }
}

class GameOver extends Screen {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth, canvasHeight);
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.img.src = "./img/gameOver.png";
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.width, this.height);
    super.draw(ctx);
  }
}

class PauseScreen extends Screen {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth, canvasHeight);
    this.img.src = "./img/pauseMode.png";
  }
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.w / 4,
      this.h / 5,
      this.img.width,
      this.img.height
    );
  }
}
