import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.grid = this.makeGrid();
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
        if (this.grid[x][y + i] !== 0 || this.grid[x][y + i] === undefined) {
          return false;
        }
      } else if (
        this.grid[x + 1][y] !== 0 ||
        this.grid[x + 1][y] === undefined
      ) {
        return false;
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
    return true;
  }

  isGameOver() {
    return this.grid.some((row) => row.includes(Ship));
  }
}

export default Gameboard;
