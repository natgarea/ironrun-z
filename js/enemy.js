class Enemy {
  constructor(canvasWidth, canvasHeight, initialX, initialY, imageSrc) {
    this.x = canvasWidth * initialX;
    this.y0 = canvasHeight * initialY;
    this.y = this.y0;

    this.img = new Image();
    this.img.src = imageSrc;

    this.img.frames = 10;
    this.img.frameIndex = 0;

    this.w = 180;
    this.h = 210;
  }

  draw(framesCounter, ctx) {
    ctx.drawImage(
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
      this.img.frameIndex += 1;
      if (this.img.frameIndex >= this.img.frames) this.img.frameIndex = 0;
    }
  }
}

class FemaleZombie extends Enemy {
  constructor(canvasWidth, canvasHeight, initialX, initialY) {
    super(canvasWidth, canvasHeight, initialX, initialY, "img/enemy/female/walk.png");
  }
}
class MaleZombie extends Enemy {
  constructor(canvasWidth, canvasHeight, initialX, initialY) {
    super(canvasWidth, canvasHeight, initialX, initialY, "img/enemy/male/walk.png");
  }
}