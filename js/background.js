class Background {
  constructor(canvasWidth, canvasHeight, imageScr) {

    this.img = new Image();
    this.img.src = imageScr;

    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;

    this.x = 0;
    this.y = 0;

    this.dx = 7;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.canvasWidth, this.canvasHeight);
    ctx.drawImage(this.img, this.x + this.canvasWidth, this.y, this.canvasWidth, this.canvasHeight);
  }

  move(isDead) {
    if (!isDead) {
      this.x -= this.dx;
      if (this.x < -this.canvasWidth) this.x = 0;
    }
  }
}

class City extends Background {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth, canvasHeight, "img/bg_city.png");
  }
}

class Forest extends Background {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth, canvasHeight, "img/bg_forest.png");
  }
}

class Dark extends Background {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth, canvasHeight, "img/bg_dark.png");
  }
}
