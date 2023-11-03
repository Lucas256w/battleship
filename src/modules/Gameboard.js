class Gameboard {
  constructor() {
    this.gird = this.makeGrid();
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
}

export default Gameboard;
