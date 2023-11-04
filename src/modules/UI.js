import Ship from "./Ship";
import Player from "./Player";
import Gameboard from "./Gameboard";

const carrierPlayer = new Ship(5, "Carrier");
const battleShipPlayer = new Ship(4, "BattleShip");
const cruiserPlayer = new Ship(3, "Destroyer");
const submarinePlayer = new Ship(3, "Submarine");
const destroyerPlayer = new Ship(2, "Patrol Boat");
const shipArrayPlayer = [
  carrierPlayer,
  battleShipPlayer,
  cruiserPlayer,
  submarinePlayer,
  destroyerPlayer,
];

class UserInterface {
  static activateUI() {
    console.log("hello");
    const gameboardOne = document.querySelector("#gameboard-one");
    const gameboardTwo = document.querySelector("#gameboard-two");

    const [player, enemy] = this.generatePlayers();

    this.generatePlayerGrid(gameboardOne, player);
    this.generateEnemyGrid(gameboardTwo, enemy, gameboardOne, player);

    this.generateEnemyShips(enemy);
    this.placeShipDialog(gameboardOne, player, shipArrayPlayer.pop());
  }

  static generatePlayerGrid(gameboard, player) {
    gameboard.innerHTML = "";
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

  static generateEnemyGrid(gameboard, enemy, gameboardOne, player) {
    const winnerDialog = document.querySelector("#winner-dialog");
    const winnerTitle = document.querySelector("#winner-title");
    const playAgainBtn = document.querySelector("#play-again-btn");
    playAgainBtn.addEventListener("click", () => {
      location.reload();
    });
    for (let i = 0; i < 10; i += 1) {
      const row = document.createElement("div");
      row.className = "cell-row";
      for (let j = 0; j < 10; j += 1) {
        const column = document.createElement("div");
        column.className = "cell-column";
        column.addEventListener("click", () => {
          if (
            !column.classList.contains("hit") &&
            !column.classList.contains("miss")
          ) {
            enemy.gameboard.receiveAttack(i, j);
            column.classList.add(enemy.gameboard.grid[i][j]);
            if (enemy.gameboard.gameOver) {
              winnerDialog.showModal();
              winnerTitle.textContent = "Congratulations You've Won!";
              winnerDialog.style.display = "flex";
            }
            enemy.takeTurn();
            this.generatePlayerGrid(gameboardOne, player);
            if (player.gameboard.gameOver) {
              winnerDialog.showModal();
              winnerTitle.textContent = "Oh No You've Lost!";
              winnerDialog.style.display = "flex";
            }
          }
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

  static placeShipDialog(gameboard, player, ship) {
    const dialog = document.querySelector("#placement-dialog");
    dialog.showModal();
    const placementGrid = document.querySelector("#placement-grid");

    const dialogTitle = document.querySelector("#dialog-title");
    dialogTitle.textContent = `Place your ${ship.name}`;

    const rotateBtn = document.querySelector("#rotate-button");
    rotateBtn.addEventListener("click", () => {
      ship.rotate();
    });
    placementGrid.innerHTML = "";
    for (let i = 0; i < 10; i += 1) {
      const row = document.createElement("div");
      row.className = "placement-row";
      for (let j = 0; j < 10; j += 1) {
        const column = document.createElement("div");
        column.className = "placement-column";
        column.setAttribute("Coordinate", `${i}${j}`);
        if (player.gameboard.grid[i][j] instanceof Ship) {
          column.classList.add("ship");
        }

        column.addEventListener("mouseover", () => {
          for (let z = ship.length - 1; z >= 0; z -= 1) {
            try {
              if (ship.isHorizontal) {
                const cell = document.querySelector(
                  `[Coordinate="${i}${j + z}"]`,
                );
                cell.classList.add("yellow");
              } else {
                const cell = document.querySelector(
                  `[Coordinate="${i + z}${j}"]`,
                );
                cell.classList.add("yellow");
              }
            } catch (error) {
              console.log("can't place it there");
              break;
            }
          }
        });

        column.addEventListener("mouseout", () => {
          for (let z = ship.length - 1; z >= 0; z -= 1) {
            try {
              if (ship.isHorizontal) {
                const cell = document.querySelector(
                  `[Coordinate="${i}${j + z}"]`,
                );
                cell.classList.remove("yellow");
              } else {
                const cell = document.querySelector(
                  `[Coordinate="${i + z}${j}"]`,
                );
                cell.classList.remove("yellow");
              }
            } catch (error) {
              console.log("");
              break;
            }
          }
        });

        column.addEventListener("click", () => {
          const result = player.gameboard.placeShip(
            ship,
            i,
            j,
            ship.isHorizontal,
          );

          if (result) {
            if (shipArrayPlayer.length === 0) {
              dialog.style.display = "none";
              dialog.close();
              this.generatePlayerGrid(gameboard, player);
            } else {
              this.placeShipDialog(gameboard, player, shipArrayPlayer.pop());
            }
          }
          console.log(result);
        });

        row.appendChild(column);
      }
      placementGrid.appendChild(row);
    }
  }
}

export default UserInterface;
