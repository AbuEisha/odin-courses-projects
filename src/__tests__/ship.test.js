import { Ship } from "../js/ship.js";

describe("Ship", () => {
  test("initial hits = 0 and correct length", () => {
    const s = new Ship(3);
    expect(s.hits).toBe(0);
    expect(s.length).toBe(3);
  });

  test("hit() increments until length", () => {
    const s = new Ship(2);
    s.hit();
    expect(s.hits).toBe(1);
    s.hit();
    expect(s.hits).toBe(2);
    s.hit(); // should not increment after sunk
    expect(s.hits).toBe(2);
  });

  test("isSunk() returns true when hits >= length", () => {
    const s = new Ship(1);
    expect(s.isSunk()).toBe(false);
    s.hit();
    expect(s.isSunk()).toBe(true);
  });
});
