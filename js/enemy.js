class Enemy {
    constructor(w, h, ctx, initialX, initialY, imageSrc) {
        // puedo llamar fuera a canvasW y canvasH?
        // ctx tiene que estar en todos lados?
      this.canvasW = w;
      this.canvasH = h;
      this.ctx = ctx;
      this.x = this.canvasW * initialX;
      this.y0 = this.canvasH * initialY;
      this.y = this.y0;
  
      // TODO change for subclass
      this.img = new Image();
      this.img.src = imageSrc;

      this.img.frames = 10;
      this.img.frameIndex = 0;
  
      this.w = 180;
      this.h = 210;  

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
                console.log(this.img.frameIndex);
            if (this.img.frameIndex >= 10) this.img.frameIndex = 0;
          } }
        }
  
class FemaleZombie extends Enemy {
    constructor(w, h, ctx, initialX, initialY) {
        super(w, h, ctx, initialX, initialY, "img/enemy/female/walk.png");

    }
}
class MaleZombie extends Enemy {
    constructor(w, h, ctx, initialX, initialY) {
        super(w, h, ctx, initialX, initialY, "img/enemy/male/walk.png");
    }
}
class PumpkinMonster extends Enemy {
}

class Horde {
    constructor(enemies) {
        this.enemies = enemies;
    }

    draw(framesCounter) {
        this.enemies.forEach(enemy => enemy.draw(framesCounter))
    }

    animateImg(framesCounter) {
        this.enemies.forEach(enemy => enemy.animateImg(framesCounter))
    }    

}