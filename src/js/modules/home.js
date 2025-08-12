const homePage = (container) => {
  let mainDiv = document.createElement("div");
  mainDiv.className = "home-page custom-sittings overlay";
  container.appendChild(mainDiv);
  let introTxt = document.createElement("div");
  introTxt.className = "intro-text";
  mainDiv.appendChild(introTxt);
  let header = document.createElement("h1");
  header.innerHTML = "This Is Amazing Wonderfull Abu Eisha Restaurant";
  introTxt.appendChild(header);
  let intro = document.createElement("p");
  intro.textContent =
    "Abu Eisha Restaurant offers a unique dining experience that blends authentic Egyptian flavors with fresh seafood and home-style grilled dishes. Each plate is crafted with high-quality ingredients and special spice blends that transport you to the heart of traditional Egyptian cuisine. The atmosphere is warm and family-friendly, where refined taste meets comfort and intimacy.";
  introTxt.appendChild(intro);
};

export default homePage;
