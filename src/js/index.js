import "../css/style.css";
import homePage from "../js/modules/home";
import menuPage from "../js/modules/menu";
import aboutPage from "../js/modules/about";
let contentContainer = document.getElementById("content");
let navButtons = document.querySelectorAll("nav button");
contentContainer.innerHTML = "";
homePage.call("", contentContainer);
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((button) => button.classList.remove("active"));
    button.classList.add("active");
    contentContainer.innerHTML = "";
    if (button.dataset.nav === "homePage") {
      homePage.call("", contentContainer);
    } else if (button.dataset.nav === "menuPage") {
      menuPage.call("", contentContainer);
    } else {
      aboutPage.call("", contentContainer);
    }
  });
});
