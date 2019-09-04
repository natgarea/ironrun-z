class Background {
  constructor(w, h, ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "img/bg_city.png"

    this.h = h;
    this.w = w;

    this.x = 0;
    this.y = 0;

    this.dx = 7;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.dx;

    if (this.x < -this.w) this.x = 0;
  }
}

// class City extends Background {
//   constructor(w, h, ctx) {
//     super(w, h, ctx, img, x, y, dx);
//     this.img.src = "img/bg_city.png";
//   }
// }

// class Forest extends Background {
//   constructor(w, h, ctx) {
//     super(w, h, ctx, img, x, y, dx);
//     this.img.src = "img/bg_forest.png";
//   }
// }

// class Dark extends Background {
//   constructor(w, h, ctx) {
//     super(w, h, ctx, img, x, y, dx);
//     this.img.src = "img/bg_dark.png";
//   }
// }
