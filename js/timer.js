class Timer {
  constructor(w, h, ctx) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.gameCount;
    this.minutes;
    this.seconds;
    this.img = new Image;
    this.img.src = "img/timeCounter.png";
  }

  twoDigitsNumber(number) {

    let resultNumber = number.toString();

    if(resultNumber.length <= 1){
      return resultNumber = 0 + resultNumber;
    }
    return resultNumber
   }

  draw(timer) {
    this.seconds = this.twoDigitsNumber(Math.floor((timer / 60) % 60));
    this.minutes = this.twoDigitsNumber(Math.floor((timer / 60) / 60));
    this.gameCount = `${this.minutes} : ${this.seconds}`;
      this.pauseText = `press 'esc' key to pause`;
      this.ctx.drawImage(this.img, this.canvasW / 3, this.canvasH / 30);
      this.ctx.font = "30px Courier";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(this.gameCount, this.canvasW / 2.35, this.canvasH / 11);
      this.ctx.font = "20px Courier";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(this.pauseText, this.canvasW / 2.78, this.canvasH / 7.8);
  }

}
