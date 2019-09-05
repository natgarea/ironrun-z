class Controls {
    constructor(player) {
        this.pause = false;
        this.player = player;
    }

setEventListeners() {
    
    window.onkeydown = (e) => {
        switch (e.keyCode) {
          // 'esc'
          case 27:
            this.pause = true;
            break;
          // 'enter'
          case 13:
            this.pause = false;
            break;
          // space bar
          case 32:
            this.player.jump()
            break;
          // 's' key
          case 83:
            if (this.player.isDead) {
              Game.init("canvas"); }
            break;
        }
      }
    }
}
