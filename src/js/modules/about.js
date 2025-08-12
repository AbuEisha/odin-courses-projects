let adventages = [
  "Daily fresh ingredients",
  "Carefully prepared homemade recipes",
  "Variety including fish, seafood, and grilled specialties",
  "Secret spice blends that deliver an unforgettable taste",
  "Attention to presentation details that satisfy all palates",
];
const aboutPage = (container) => {
  let mainDiv = document.createElement("div");
  mainDiv.className = "about-page custom-sittings overlay";
  container.appendChild(mainDiv);
  let content = document.createElement("div");
  content.className = "content";
  mainDiv.appendChild(content);
  let header = document.createElement("h2");
  header.innerHTML = "About Abu Eisha Restaurant";
  content.appendChild(header);
  let text = document.createElement("p");
  text.textContent =
    "Abu Eisha Restaurant offers a unique dining experience that blends authentic Egyptian flavors with fresh seafood and home-style grilled dishes. Each plate is crafted with high-quality ingredients and special spice blends that transport you to the heart of traditional Egyptian cuisine. The atmosphere is warm and family-friendly, where refined taste meets comfort and intimacy.";
  content.appendChild(text);

  let headerTwo = document.createElement("h2");
  headerTwo.textContent = "What Sets Abu Eisha Restaurant Apart";
  content.appendChild(headerTwo);

  let list = document.createElement("ul");
  content.appendChild(list);
  for (let i = 0; i < 5; i++) {
    let item = document.createElement("li");
    item.textContent = adventages[i];
    list.appendChild(item);
  }
  let textTwo = document.createElement("p");
  textTwo.textContent =
    "Embark on an unparalleled culinary journey through the authentic tastes of Egypt.";
  content.appendChild(textTwo);
};

export default aboutPage;
