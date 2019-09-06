class Screen {
  constructor(w, h, ctx) {
    this.ctx = ctx;
    this.img = new Image();

    this.w = w;
    this.h = h;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.w / 7,
      this.h / 5,
      this.img.width,
      this.img.height
    );
  }
}

class StartScreen extends Screen {
  constructor(w, h, ctx) {
    super(w, h, ctx);
    this.img.src = "./img/startScreen.png";
  }
}

class GameOver extends Screen {
  constructor(w, h, ctx) {
    super(w, h, ctx);
    this.img.src = "./img/gameOver.png";
  }
}

class PauseScreen extends Screen {
  constructor(w, h, ctx) {
    super(w, h, ctx);
    this.img.src = "./img/pauseMode.png";
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      this.w / 4,
      this.h / 5,
      this.img.width,
      this.img.height
    );
  }
}
