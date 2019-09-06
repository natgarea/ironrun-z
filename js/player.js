class Player {
  constructor(w, h, ctx) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.x = this.canvasW * 0.35;
    this.y0 = this.canvasH * 0.56;
    this.y = this.y0;
    this.vy = 1;
    this.isDead = false;

    this.img = new Image();
    this.img.src = "img/player/female/run.png";
    this.img.frames = 20;
    this.w = 160;
    this.h = 175;

    this.img.frameIndex = 0;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.animateImg(framesCounter);
  }

  animateImg(framesCounter) {
    if (framesCounter % 3 === 0) {
      if (this.img.frameIndex === this.img.frames - 1 && this.isDead) {
        this.img.frameIndex = this.img.frames - 1;
      } else {
        this.img.frameIndex += 1;
        if (this.img.frameIndex >= this.img.frames) this.img.frameIndex = 0;
      }
    }
  }

  die() {
    this.img.src = "img/player/female/dead.png";
    this.img.frames = 30;
    this.w = 216;
    this.h = 180;
  }

  jump() {
    if (this.y == this.y0 && !this.isDead) {
      this.y -= 5;
      this.vy -= 10;
    }
  }

  move() {
    var gravity = 0.4;

    if (this.y >= this.y0) {
      this.vy = 1;
      this.y = this.y0;
    } else {
      this.vy += gravity;
      this.y += this.vy;
    }
  }
}
