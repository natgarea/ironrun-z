function isCollision(element1, element2) {
  return (
    element1.x < element2.x + element2.w &&
    element1.x + element1.w > element2.x &&
    element1.y < element2.y + element2.h &&
    element1.y + element1.h > element2.y
  );
}

function isPlayerCollision(obstacles, player, game) {
  for (var i = 0; i < obstacles.length; i++) {
    if (isCollision(obstacles[i], player)) {
      obstacles.splice(i, 1);
      game.gameOver();
    }
  }
}

function isZombieCollision(obstacles, enemyHorde, player) {
  for (var i = 0; i < obstacles.length; i++) {
    if (isCollision(obstacles[i], enemyHorde.enemies[2]) && !player.isDead) {
      new Bite().play();
      obstacles.splice(i, 1);
    }
  }
}
