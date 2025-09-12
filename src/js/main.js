import "../css/main.css";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import { domManager } from "./domManager.js";

let placedCount = 0;
let currentDir = "h"; // 'h' or 'v'
let gameOver = false;

const human = new Player("real");
const computer = new Player("computer");

// Disable further interaction on both grids
function disableInteraction() {
  document.getElementById("computer-grid").style.pointerEvents = "none";
  document.getElementById("player-grid").style.pointerEvents = "none";
}

// 1. Create placement grid
domManager.createGrid("placement-grid");

// 2. Rotate orientation button
const rotateBtn = document.getElementById("rotate-btn");
rotateBtn.addEventListener("click", () => {
  currentDir = currentDir === "h" ? "v" : "h";
  rotateBtn.textContent = `Rotate Ship (${
    currentDir === "h" ? "Horizontal" : "Vertical"
  })`;
});

// 3. Enable drag & drop with orientation
domManager.enableDragPlacement(
  (start, length, dir) => {
    const coords = [];
    const [r, c] = start;
    for (let i = 0; i < length; i++) {
      const rr = dir === "h" ? r : r + i;
      const cc = dir === "h" ? c + i : c;
      if (rr > 9 || cc > 9) return alert("Out of bounds!");
      coords.push([rr, cc]);
    }

    // Prevent overlap
    const overlap = human.gameboard.ships
      .flatMap((e) => e.coords)
      .some(([rr, cc]) => coords.some(([nr, nc]) => nr === rr && nc === cc));
    if (overlap) return alert("Ships overlap!");

    // Render ship placement
    coords.forEach((coord) =>
      domManager.updateCell("placement-grid", coord, "ship")
    );
    human.gameboard.placeShip(new Ship(length), coords);
    placedCount++;

    // Mark the ship in palette as placed
    const shipEl = document.querySelector(
      `.draggable[data-length="${length}"]:not(.placed)`
    );
    if (shipEl) shipEl.classList.add("placed");

    if (placedCount === 5) {
      document.getElementById("start-btn").disabled = false;
      document.getElementById("ship-container").classList.add("hidden");
    }
  },
  // pass current direction to domManager
  () => currentDir
);

// 4. Reset placement
document.getElementById("reset-btn").addEventListener("click", () => {
  location.reload();
});

// 5. Start game
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("placement-phase").classList.add("hidden");
  document.getElementById("game-phase").classList.remove("hidden");
  beginGame();
});

function beginGame() {
  // Place computer ships randomly (horizontal only or randomize dir if you prefer)
  function placeAll(player, lengths = [5, 4, 3, 3, 2]) {
    for (const len of lengths) {
      let ok = false;
      while (!ok) {
        const dir = Math.random() < 0.5 ? "h" : "v";
        const r = Math.floor(Math.random() * (dir === "h" ? 10 : 10 - len + 1));
        const c = Math.floor(Math.random() * (dir === "v" ? 10 : 10 - len + 1));
        const coords = [];
        for (let i = 0; i < len; i++) {
          const rr = dir === "h" ? r : r + i;
          const cc = dir === "h" ? c + i : c;
          coords.push([rr, cc]);
        }
        const overlap = player.gameboard.ships
          .flatMap((e) => e.coords)
          .some(([rr, cc]) =>
            coords.some(([nr, nc]) => nr === rr && nc === cc)
          );
        if (!overlap) {
          player.gameboard.placeShip(new Ship(len), coords);
          ok = true;
        }
      }
    }
  }
  placeAll(computer);

  // Render game boards and show human ships
  domManager.createGrid("player-grid");
  domManager.createGrid("computer-grid", onHumanAttack);
  human.gameboard.ships.forEach((e) =>
    e.coords.forEach((coord) =>
      domManager.updateCell("player-grid", coord, "ship")
    )
  );
}

function onHumanAttack(coord) {
  // 1. Select the cell element based on the coordinates
  const selector = `#computer-grid .cell[data-row="${coord[0]}"][data-col="${coord[1]}"]`;
  const cellEl = document.querySelector(selector);

  // 2. If this cell was already marked hit or miss, do nothing
  if (cellEl.classList.contains("hit") || cellEl.classList.contains("miss")) {
    return;
  }

  if (gameOver) return; // ignore clicks once game is over

  const { result, ship } = human.attack(computer.gameboard, coord);
  domManager.updateCell("computer-grid", coord, result);
  if (result === "hit" && ship.isSunk()) {
    domManager.showMessage("You sunk an enemy ship!");
  }
  if (computer.gameboard.allShipsSunk()) {
    domManager.showMessage("You win!");
    gameOver = true; // mark game as ended
    disableInteraction(); // turn off clicks
    return;
  }

  setTimeout(() => {
    if (gameOver) return; // extra safety check

    const { coord: cc, result: cres } = computer.attack(human.gameboard);
    domManager.updateCell("player-grid", cc, cres);
    if (cres === "hit") domManager.showMessage("Computer hit you!");
    if (human.gameboard.allShipsSunk()) {
      domManager.showMessage("Computer wins!");
      gameOver = true; // mark game as ended
      disableInteraction(); // turn off clicks
      return;
    }
  }, 500);
}
