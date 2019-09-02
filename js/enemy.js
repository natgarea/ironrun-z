class Enemy {
    constructor(w, h, ctx) {
      this.canvasW = w;
      this.canvasH = h;
      this.ctx = ctx;
      this.x = this.canvasW * 0.1;
      this.y0 = this.canvasH * 0.56;
      this.y = this.y0;
  
      // TODO change for subclass
      this.img = new Image();
      this.img.src = "img/enemy/female/walk.png";

      this.img.frames = 10;
      this.img.frameIndex = 0;
  
      this.w = 180;
      this.h = 210;  
  
      this.vy = 1;
  
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
                this.img.frameIndex += 1;
            if (this.img.frameIndex >= 10) this.img.frameIndex = 0;
          } }
        }
  
// class FemaleZombie extends Enemy {
// }
// class MaleZombie extends Enemy {
// }
// class PumpkinMonster extends Enemy {
// }