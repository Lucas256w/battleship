import Gameboard from "./Gameboard";

class Player {
  constructor(gameboard, enemyGameboard, isComputer) {
    this.isComputer = isComputer;
    this.gameboard = gameboard;
    this.enemyGameboard = enemyGameboard;
  }

  takeTurn(x, y) {
    if (this.isComputer) {
      this.makeRandomMove();
    } else {
      this.enemyGameboard.receiveAttack(x, y);
    }
  }

  makeRandomMove() {
    let attacked = false;
    while (attacked === false) {
      attacked = this.enemyGameboard.receiveAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      );
    }
  }
}

export default Player;
