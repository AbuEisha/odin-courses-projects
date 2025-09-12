import { Gameboard } from "../js/gameboard.js";
import { Ship } from "../js/ship.js";

describe("Gameboard", () => {
  let board;
  beforeEach(() => {
    board = new Gameboard();
  });

  test("placeShip() adds a ship with its coordinates", () => {
    const s = new Ship(2);
    board.placeShip(s, [
      [0, 0],
      [0, 1],
    ]);
    expect(board.ships.length).toBe(1);
  });

  test("receiveAttack() hits a ship and returns hit", () => {
    const s = new Ship(2);
    board.placeShip(s, [
      [1, 1],
      [1, 2],
    ]);
    const res = board.receiveAttack([1, 1]);
    expect(res.result).toBe("hit");
    expect(s.hits).toBe(1);
  });

  test("receiveAttack() records a miss", () => {
    const res = board.receiveAttack([5, 5]);
    expect(res.result).toBe("miss");
    expect(board.misses).toContainEqual([5, 5]);
  });

  test("allShipsSunk() returns true after sinking all ships", () => {
    const s = new Ship(1);
    board.placeShip(s, [[2, 2]]);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack([2, 2]);
    expect(board.allShipsSunk()).toBe(true);
  });
});
