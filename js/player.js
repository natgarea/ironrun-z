class Player {
  constructor(w, h, ctx, keys) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.keys = keys;
    this.x = this.canvasW * 0.3;
    this.y0 = this.canvasH * 0.56;
    this.y = this.y0;

    // TODO
    // habría que pasarlo ${character}
    // para que sepa si elige chica o chico 
    this.img = new Image();
    this.img.src = "img/player/female/run.png"

    this.img.frames = 20;
    this.img.frameIndex = 0;

    this.w = 160;
    this.h = 175;

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
      // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
      if (framesCounter % 3 === 0) {
        this.img.frameIndex += 1;
  
        // Si el frame es el último, se vuelve al primero
        if (this.img.frameIndex >= 20) this.img.frameIndex = 0;
      }
    }



}
