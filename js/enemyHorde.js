class Horde {
  constructor(enemies) {
    this.enemies = enemies;
  }

  draw(framesCounter, ctx) {
    this.enemies.forEach(enemy => enemy.draw(framesCounter, ctx));
  }

  animateImg(framesCounter) {
    this.enemies.forEach(enemy => enemy.animateImg(framesCounter));
  }
  
  attack(playerPosX) {
    this.enemies.map(enemy => {
      if (enemy.x < playerPosX) enemy.x += 6;
      if (enemy instanceof FemaleZombie) {
        enemy.img.src = "img/enemy/female/attack.png";
        enemy.img.frames = 8;
        enemy.w = 187;
        enemy.h = 207;
      }
    });
  }
}