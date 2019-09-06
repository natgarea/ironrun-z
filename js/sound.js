class Sound {
  constructor(src) {
    this.sound = new Audio(`${src}`);
  }
  play() {
    this.sound.play();
  }
}
class Bite extends Sound {
  constructor() {
    super("./sound/zombie_bite.mp3");
  }
}

class Talk extends Sound {
  constructor() {
    super("./sound/zombie_talk.mp3");
  }
}
