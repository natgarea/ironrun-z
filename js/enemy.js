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
      if (this.img.frameIndex >= this.img.frames) this.img.frameIndex = 0;
    }
  }
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

class Horde {
  constructor(enemies) {
    this.enemies = enemies;
  }

  draw(framesCounter) {
    this.enemies.forEach(enemy => enemy.draw(framesCounter));
  }

  animateImg(framesCounter) {
    this.enemies.forEach(enemy => enemy.animateImg(framesCounter));


    }
    attack(playerPosX, framesCounter) {
        this.enemies.map(enemy => {
          if(enemy.x < playerPosX) enemy.x += 6 ;
          if(enemy instanceof FemaleZombie) {
            enemy.img.src = "img/enemy/female/attack.png";
            enemy.img.frames = 8;
            enemy.w = 187;
            enemy.h = 207;
          }
          // else if (enemy instanceof MaleZombie) {
          //   enemy.img.src = "img/enemy/male/attack.png";
          // }
        });
  }

}