import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(type = "real") {
    this.type = type; // 'real' or 'computer'
    this.gameboard = new Gameboard();
    this.tried = []; // [[r,c], …]
    this.mode = "random"; // for AI
    this.targetQueue = []; // for hunt-target AI
  }

  attack(opponentBoard, coord) {
    let target;

    if (this.type === "computer") {
      if (this.mode === "target" && this.targetQueue.length) {
        target = this.targetQueue.shift();
      } else {
        target = this._randomCoord();
      }
    } else {
      target = coord;
    }

    this.tried.push(target);
    const res = opponentBoard.receiveAttack(target);

    if (this.type === "computer") {
      if (res.result === "hit") {
        this._enqueueNeighbors(target);
        this.mode = "target";
      } else if (this.mode === "target" && !this.targetQueue.length) {
        this.mode = "random";
      }
    }

    return { coord: target, ...res };
  }

  _randomCoord() {
    let r, c;
    do {
      r = Math.floor(Math.random() * 10);
      c = Math.floor(Math.random() * 10);
    } while (this.tried.some((t) => t[0] === r && t[1] === c));
    return [r, c];
  }

  _enqueueNeighbors([r, c]) {
    const deltas = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (const [dr, dc] of deltas) {
      const nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nr < 10 &&
        nc >= 0 &&
        nc < 10 &&
        !this.tried.some((t) => t[0] === nr && t[1] === nc) &&
        !this.targetQueue.some((t) => t[0] === nr && t[1] === nc)
      ) {
        this.targetQueue.push([nr, nc]);
      }
    }
  }
}
