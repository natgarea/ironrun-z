class Controls {
    constructor(player) {
        this.pause = false;
        this.player = player;
    }
setEventListeners() {
    
    window.onkeydown = (e) => {
        switch (e.keyCode) {
          // 'esc' to pause
          case 27:
            this.pause = true;
            break;
          // 'enter' to continue
          case 13:
            this.pause = false;
            break;
          case 32:
              this.player.jump()
              break;
        }
      }
    }
}
