class Timer {
  constructor(w, h, ctx) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.minutes;
    this.seconds;
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
    let gameCount = `${this.minutes} : ${this.seconds}`
    this.ctx.font = "30px Arial";
    this.ctx.fillText(gameCount, this.canvasW - 125, this.canvasH / 12);
  }

}
