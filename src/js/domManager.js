export const domManager = {
  createGrid(containerId, onClick) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    container.className = "grid";
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = r;
        cell.dataset.col = c;
        if (onClick) {
          cell.addEventListener("click", () => onClick([r, c]));
        }
        container.appendChild(cell);
      }
    }
  },

  updateCell(containerId, [r, c], status) {
    const selector = `#${containerId} .cell[data-row="${r}"][data-col="${c}"]`;
    const cell = document.querySelector(selector);
    if (cell) cell.classList.add(status);
  },

  showMessage(text) {
    const msg = document.getElementById("message");
    msg.textContent = text;
  },

  enableDragPlacement(onPlace, getDir) {
    // Make palette ships draggable
    document.querySelectorAll(".draggable").forEach((ship) => {
      ship.draggable = true;
      ship.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("length", ship.dataset.length);
        // capture current orientation
        e.dataTransfer.setData("dir", getDir());
        // add visual cue on ship being dragged
        ship.classList.toggle("vertical", getDir() === "v");
      });
    });

    // Wire up placement-grid cells
    document.querySelectorAll("#placement-grid .cell").forEach((cell) => {
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
        cell.classList.add("hover");
      });
      cell.addEventListener("dragleave", () => {
        cell.classList.remove("hover");
      });
      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        document
          .querySelectorAll(".cell.hover")
          .forEach((c) => c.classList.remove("hover"));

        const len = +e.dataTransfer.getData("length");
        const dir = e.dataTransfer.getData("dir");
        const startRow = +cell.dataset.row;
        const startCol = +cell.dataset.col;
        onPlace([startRow, startCol], len, dir);
      });
    });
  },
};
