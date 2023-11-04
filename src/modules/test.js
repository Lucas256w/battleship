import Ship from "./Ship";
import Gameboard from "./Gameboard";
import Player from "./Player";

describe("Ship", () => {
  test("should initialize a ship with the correct length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });

  test("should initialize timesHit to 0, horizontal and not be sunk", () => {
    const ship = new Ship(2);
    expect(ship.timesHit).toBe(0);
    expect(ship.sunked).toBe(false);
    expect(ship.isHorizontal).toBe(true);
  });

  test("should increment timesHit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.timesHit).toBe(1);
    ship.hit();
    expect(ship.timesHit).toBe(2);
  });

  test("should return sunk as true when timesHit equal length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunked).toBe(true);
  });

  test("ship should be able to rotate", () => {
    const ship = new Ship(3);
    ship.rotate();
    expect(ship.isHorizontal).toBe(false);
    ship.rotate();
    expect(ship.isHorizontal).toBe(true);
  });
});

describe("Gameboard - placeShip", () => {
  test("should create correct grid", () => {
    const gameboard = new Gameboard();
    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test("should be able to place ships at specific coords horizontally", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 7, 4, ship.isHorizontal);

    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, ship, ship, ship, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test("should be able to place ships at specific coords vertically", () => {
    const ship = new Ship(3);
    ship.rotate();
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 7, 4, ship.isHorizontal);

    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, ship, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, ship, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, ship, 0, 0, 0, 0, 0],
    ]);
  });

  test("should not be able to place ships where coords already have ships", () => {
    const ship = new Ship(3);
    const ship2 = new Ship(4);
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 7, 3, ship.isHorizontal);
    gameboard.placeShip(ship2, 7, 4, ship2.isHorizontal);

    ship2.rotate();
    gameboard.placeShip(ship2, 6, 4, ship2.isHorizontal);

    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, ship, ship, ship, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test("should not be able to place out of bound", () => {
    const ship = new Ship(5);
    const ship2 = new Ship(3);
    ship.rotate();
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 6, 2, ship.isHorizontal);
    gameboard.placeShip(ship2, 0, 9, ship2.isHorizontal);

    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});

describe("Gameboard - receiveAttack", () => {
  test("update grid with hit miss", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 7, 4, ship.isHorizontal);
    gameboard.receiveAttack(1, 3);

    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, "miss", 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, ship, ship, ship, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test("update grid with hit not miss", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 7, 4, ship.isHorizontal);
    gameboard.receiveAttack(7, 4);
    gameboard.receiveAttack(7, 5);

    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "hit", "hit", ship, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    expect(ship.timesHit).toBe(2);
  });
});

describe("Gameboard - isGameOver", () => {
  test("check game is not over when not all ships have been hit", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 7, 4, ship.isHorizontal);
    gameboard.receiveAttack(7, 4);
    gameboard.receiveAttack(7, 5);

    expect(gameboard.gameOver).toBe(false);
  });

  test("check game is over when all ships have been hit", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, 7, 4, ship.isHorizontal);
    gameboard.receiveAttack(7, 4);
    gameboard.receiveAttack(7, 5);
    gameboard.receiveAttack(7, 6);

    expect(gameboard.gameOver).toBe(true);
  });
});

describe("Player", () => {
  test("player should be able to attack enemy board", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();

    const gameboard2 = new Gameboard();

    const player = new Player(gameboard, gameboard2, false);
    const player2 = new Player(gameboard2, gameboard, false);

    gameboard2.placeShip(ship, 7, 4, ship.isHorizontal);

    player.takeTurn(7, 4);

    expect(gameboard2.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "hit", ship, ship, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
