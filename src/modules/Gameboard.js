import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.grid = this.makeGrid();
    this.gameOver = false;
  }

  // eslint-disable-next-line class-methods-use-this
  makeGrid() {
    const grid = [];

    for (let i = 0; i < 10; i += 1) {
      const row = [];

      for (let j = 0; j < 10; j += 1) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  }

  placeShip(ship, x, y, isHorizontal) {
    for (let i = 0; i < ship.length; i += 1) {
      if (isHorizontal) {
        if (this.grid[x][y + i] === undefined || this.grid[x][y + i] !== 0) {
          return false;
        }
      }

      if (!isHorizontal) {
        try {
          const temp = this.grid[x + i][y];
        } catch (error) {
          return false;
        }
        if (this.grid[x + i][y] !== 0) {
          return false;
        }
      }
    }

    for (let i = 0; i < ship.length; i += 1) {
      isHorizontal
        ? (this.grid[x][y + i] = ship)
        : (this.grid[x + i][y] = ship);
    }
    return true;
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] === "miss" || this.grid[x][y] === "hit") {
      return false;
    }
    if (this.grid[x][y] === 0) {
      this.grid[x][y] = "miss";
      return true;
    }
    this.grid[x][y].hit();
    this.grid[x][y] = "hit";
    this.isGameOver();
    return true;
  }

  isGameOver() {
    let shipFound = false;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (this.grid[i][j] instanceof Ship) {
          shipFound = true;
        }
      }
    }

    this.gameOver = !shipFound;
  }
}

export default Gameboard;
