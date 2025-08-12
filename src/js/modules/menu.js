let recipesCat = [
  "All",
  "Main Course",
  "Appetizer",
  "Side Dish",
  "Dessert",
  "Drink",
];
let recipesCount = 17;
let recipesNames = [
  "Hamour Meshwy",
  "Shrimp Tajine with Potatoes",
  "Fish Sayadiya",
  "Grilled Lamb Kofta",
  "Mixed Seafood Platter",
  "Calamari Salad with Tahini",
  "Stuffed Prawns",
  "Seafood Ceviche",
  "Egyptian Dressed Salad",
  "Molokhia Soup",
  "Feteer Meshaltet",
  "Om Ali",
  "Konafa with Ice Cream",
  "Basbousa",
  "Hibiscus Tea",
  "Tamarind Juice",
  "Sahlab",
];
let recipesImgs = [
  "https://bit.ly/45do0rs",
  "https://bit.ly/4lnCLfU",
  "https://bit.ly/4maCRsD",
  "https://tinyurl.com/yuhmw7c5",
  "https://tinyurl.com/2tafsjrp",
  "https://tinyurl.com/a42sy3cy",
  "https://tinyurl.com/k4hcpbxa",
  "https://tinyurl.com/yc67vu2y",
  "https://tinyurl.com/248c64kx",
  "https://tinyurl.com/ecrkw2vr",
  "https://tinyurl.com/ymu45s2e",
  "https://tinyurl.com/2mx92pnz",
  "https://tinyurl.com/nvypz9cw",
  "https://tinyurl.com/4wzbztyw",
  "https://tinyurl.com/yeyp9baf",
  "https://tinyurl.com/5622x249",
  "https://tinyurl.com/bdz3m7xx",
];

let recipesPrices = [
  "45 €",
  "38 €",
  "35 €",
  "32 €",
  "65 €",
  "22 €",
  "50 €",
  "28 €",
  "14 €",
  "16 €",
  "20 €",
  "15 €",
  "18 €",
  "14 €",
  "4.5 €",
  "5 €",
  "6 €",
];
const menuPage = (container) => {
  let mainDiv = document.createElement("div");
  mainDiv.className = "menu-page custom-sittings overlay";
  container.appendChild(mainDiv);
  let header = document.createElement("h2");
  header.innerHTML = "Abu Eisha Restaurant's Menu";
  mainDiv.appendChild(header);
  let menuBoxes = document.createElement("div");
  menuBoxes.className = "menu-boxes";
  mainDiv.appendChild(menuBoxes);
  let shuffle = document.createElement("ul");
  shuffle.className = "shuffle";
  menuBoxes.appendChild(shuffle);
  for (let i = 0; i < recipesCat.length; i++) {
    let shuffleItem = document.createElement("li");
    shuffleItem.textContent = recipesCat[i];
    shuffleItem.className = "shuffle-item";
    if (i === 0) shuffleItem.classList.add("active");
    recipesCat[i] == "All"
      ? (shuffleItem.dataset.cat = "all-recipes")
      : (shuffleItem.dataset.cat = recipesCat[i]
          .replace(" ", "-")
          .toLowerCase());
    shuffle.appendChild(shuffleItem);
  }
  let menuContent = document.createElement("div");
  menuContent.className = "menu-content";
  menuBoxes.appendChild(menuContent);
  for (let x = 0; x < recipesCount; x++) {
    let recipe = document.createElement("div");
    recipe.className = "all-recipes";
    x < 4
      ? recipe.classList.add("main-course")
      : x < 8
      ? recipe.classList.add("appetizer")
      : x < 11
      ? recipe.classList.add("side-dish")
      : x < 14
      ? recipe.classList.add("dessert")
      : recipe.classList.add("drink");
    menuContent.appendChild(recipe);
    let recipeImg = document.createElement("img");
    recipeImg.src = recipesImgs[x];
    recipe.appendChild(recipeImg);
    let recipeTitle = document.createElement("h4");
    recipeTitle.textContent = recipesNames[x];
    recipe.appendChild(recipeTitle);
    let info = document.createElement("div");
    info.className = "info";
    recipe.appendChild(info);
    let price = document.createElement("div");
    price.className = "price";
    price.textContent = recipesPrices[x];
    info.appendChild(price);
    let order = document.createElement("a");
    order.href = "#";
    order.textContent = "Order Now";
    info.appendChild(order);
    let category = document.createElement("div");
    category.className = "category";
    x < 4
      ? (category.textContent = "Main Course")
      : x < 8
      ? (category.textContent = "Appetizer")
      : x < 11
      ? (category.textContent = "Side Dish")
      : x < 14
      ? (category.textContent = "Dessert")
      : (category.textContent = "Drink");
    info.appendChild(category);
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("shuffle-item")) {
      document
        .querySelectorAll(".shuffle-item")
        .forEach((item) => item.classList.remove("active"));
      e.target.classList.add("active");

      document.querySelectorAll(".all-recipes").forEach((recipe) => {
        if (!recipe.classList.contains(e.target.dataset.cat)) {
          recipe.style.display = "none";
        } else {
          recipe.style.display = "block";
        }
      });
    }
  });
};

export default menuPage;
