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
        if (this.grid[x][y + i] === 1 || this.grid[x][y + i] === undefined) {
          return false;
        }
      } else if (
        this.grid[x + 1][y] === 1 ||
        this.grid[x + 1][y] === undefined
      ) {
        return false;
      }
    }

    for (let i = 0; i < ship.length; i += 1) {
      isHorizontal ? (this.grid[x][y + i] = 1) : (this.grid[x + i][y] = 1);
    }
    return true;
  }
}

export default Gameboard;
