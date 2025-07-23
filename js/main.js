let gridContainer = document.querySelector(".container");
// Create Reset Sketch Buttons\
let resetButton = document.createElement("button");
resetButton.className = "reset";
resetButton.textContent = "Reset Sketch Pad";
document.body.prepend(resetButton);
// Create Resize Sketch Buttons\
let resizeButton = document.createElement("button");
resizeButton.className = "resize";
resizeButton.textContent = "Resize Sketch Pad";
document.body.prepend(resizeButton);
// Create Fixed Color Button
let fixedButton = document.createElement("button");
fixedButton.className = "fixed-color";
fixedButton.textContent = "Fixed Color";
document.body.prepend(fixedButton);
// Create Random Color Button
let randomButton = document.createElement("button");
randomButton.className = "random-color";
randomButton.textContent = "Random Color";
document.body.prepend(randomButton);
// Some Variables
let divNumbers = 16;
let mainColor = "#E91E63";
let isRandom = true;

const createSquareDivs = (num) => {
  for (let i = 0; i < num * num; i++) {
    let div = document.createElement("div");
    div.className = "col";
    gridContainer.appendChild(div);

    div.style.cssText = `flex-basis: calc((100% - ${
      (num - 1) * 2
    }px) / ${num}); border: 1px solid #a7a7a7; background-color: white; transition: 0.3s`;
  }
};

const randomColor = () => {
  mainColor = "#";
  let hesCode = "a0b1c2d3e4f56789";
  for (let i = 0; i < 6; i++) {
    mainColor += hesCode[Math.floor(Math.random() * hesCode.length)];
  }

  return mainColor;
};

const changingColor = () => {
  document.querySelectorAll(".container .col").forEach((div) => {
    div.addEventListener("mouseover", function () {
      this.style.backgroundColor = isRandom ? randomColor() : mainColor;

      if (parseFloat(this.style.opacity) === 1) {
        this.style.opacity = 1;
      } else if (
        parseFloat(this.style.opacity) >= 0.1 &&
        parseFloat(this.style.opacity) < 1
      ) {
        this.style.opacity = parseFloat(this.style.opacity) + 0.1;
      } else {
        this.style.opacity = 0.1;
      }
    });
  });
};

randomButton.addEventListener("click", function () {
  isRandom = true;
});

fixedButton.addEventListener("click", function () {
  isRandom = false;
  mainColor = "#E91E63";
});

resizeButton.addEventListener("click", function () {
  gridContainer.innerHTML = "";
  divNumbers = parseInt(
    prompt("Enter Number Of Square Divs Less Than 100", 16)
  );
  if (divNumbers > 100 || divNumbers <= 0 || isNaN(divNumbers)) {
    divNumbers = 16;
  }
  createSquareDivs(divNumbers);
  changingColor();
});

resetButton.addEventListener("click", function () {
  let boxes = document.querySelectorAll(".container .col");
  let numOfGrid = Math.sqrt(boxes.length);
  boxes.forEach((div) => {
    div.style.cssText = `background-color: white; flex-basis: calc((100% - ${
      (numOfGrid - 1) * 2
    }px) / ${numOfGrid}); border: 1px solid #a7a7a7;`;
  });
  isRandom = true;
});
createSquareDivs(divNumbers);
changingColor();
