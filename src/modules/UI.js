import Ship from "./Ship";
import Player from "./Player";
import Gameboard from "./Gameboard";

class UserInterface {
  static activateUI() {
    console.log("hello");
    const gameboardOne = document.querySelector("#gameboard-one");
    const gameboardTwo = document.querySelector("#gameboard-two");

    const [player, enemy] = this.generatePlayers();

    this.generatePlayerGrid(gameboardOne, player);
    this.generateEnemyGrid(gameboardTwo, enemy);

    this.generateEnemyShips(enemy);
  }

  static generatePlayerGrid(gameboard, player) {
    for (let i = 0; i < 10; i += 1) {
      const row = document.createElement("div");
      row.className = "cell-row";
      for (let j = 0; j < 10; j += 1) {
        const column = document.createElement("div");
        column.className = "cell-column";
        if (player.gameboard.grid[i][j] instanceof Ship) {
          column.classList.add("ship");
        } else {
          column.classList.add(player.gameboard.grid[i][j]);
        }
        row.appendChild(column);
      }
      gameboard.appendChild(row);
    }
  }

  static generateEnemyGrid(gameboard, enemy) {
    for (let i = 0; i < 10; i += 1) {
      const row = document.createElement("div");
      row.className = "cell-row";
      for (let j = 0; j < 10; j += 1) {
        const column = document.createElement("div");
        column.className = "cell-column";
        column.addEventListener("click", () => {
          enemy.gameboard.receiveAttack(i, j);
          column.classList.add(enemy.gameboard.grid[i][j]);
          enemy.takeTurn();
        });
        row.appendChild(column);
      }
      gameboard.appendChild(row);
    }
  }

  static generateEnemyShips(enemy) {
    const carrier = new Ship(5);
    const battleShip = new Ship(4);
    const cruiser = new Ship(3);
    const submarine = new Ship(3);
    const destroyer = new Ship(2);

    const shipArray = [carrier, battleShip, cruiser, submarine, destroyer];
    let i = 0;

    while (i < 5) {
      if (
        enemy.gameboard.placeShip(
          shipArray[i],
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.random() < 0.5,
        )
      ) {
        i += 1;
      }
    }
  }

  static generatePlayers() {
    const playerGameboard = new Gameboard();
    const enemyGameboard = new Gameboard();

    const player = new Player(playerGameboard, enemyGameboard, false);
    const enemy = new Player(enemyGameboard, playerGameboard, true);

    return [player, enemy];
  }
}

export default UserInterface;
