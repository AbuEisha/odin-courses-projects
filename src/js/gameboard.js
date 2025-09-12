import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.ships = []; // [{ ship: Ship, coords: [r,c]… }]
    this.misses = []; // [[r,c], …]
  }

  placeShip(ship, coords) {
    this.ships.push({ ship, coords });
  }

  receiveAttack([r, c]) {
    for (const entry of this.ships) {
      for (const [sr, sc] of entry.coords) {
        if (sr === r && sc === c) {
          entry.ship.hit();
          return { result: "hit", ship: entry.ship };
        }
      }
    }
    if (!this.misses.some((m) => m[0] === r && m[1] === c)) {
      this.misses.push([r, c]);
    }
    return { result: "miss" };
  }

  allShipsSunk() {
    return this.ships.every((e) => e.ship.isSunk());
  }
}
