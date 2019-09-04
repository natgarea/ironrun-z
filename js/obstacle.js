//constructor de obstáculos
class Obstacle {
    constructor(w, playerY, playerH, ctx, imgSrc) {
      this.ctx = ctx;
      this.w = 15;
      this.h = this.w * 3;
      this.dx = 10;
      this.x = w;
      this.y = playerY + playerH - this.h - 20;

      this.img = new Image();
      this.img.src = imgSrc;
      this.img.frames;
      this.img.frameIndex = 0;
    }
  
    drawStatic() {
      this.ctx.drawImage(this.img, this.x, this.y);
      // this.ctx.fillStyle = "black";
      // this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    // drawAnimation(){
      
    // }
  
    move() {
      this.x -= this.dx;
    }
  }

  class Brains extends Obstacle {
    constructor(w, playerY, playerH, ctx) { 
    super(w, playerY, playerH, ctx,"img/obstacle/brain.png")
    };
  }