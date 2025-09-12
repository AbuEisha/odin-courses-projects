import { Player } from "../js/player.js";
import { Ship } from "../js/ship.js";

describe("Player", () => {
  let human, comp;
  beforeEach(() => {
    human = new Player("real");
    comp = new Player("computer");
  });

  test("real player uses the passed coordinate", () => {
    const opponent = new Player("real").gameboard;
    opponent.placeShip(new Ship(1), [[0, 0]]);
    const { result, coord } = human.attack(opponent, [0, 0]);
    expect(result).toBe("hit");
    expect(coord).toEqual([0, 0]);
  });

  test("computer chooses random, non-repeated coordinates", () => {
    const tried = new Set();
    for (let i = 0; i < 50; i++) {
      const { coord } = comp.attack(new Player("real").gameboard);
      tried.add(coord.join(","));
    }
    expect(tried.size).toBeGreaterThan(1);
  });
});
