import Ship from "./Ship";

describe("Ship", () => {
  test("should initialize a ship with the correct length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });

  test("should initialize timesHit to 0 and not be sunk", () => {
    const ship = new Ship(2);
    expect(ship.timesHit).toBe(0);
    expect(ship.sunked).toBe(false);
  });

  test("should increment timeHit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.timesHit).toBe(1);
    ship.hit();
    expect(ship.timesHit).toBe(2);
  });
});
