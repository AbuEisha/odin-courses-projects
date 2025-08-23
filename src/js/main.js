import "../css/main.css";

let cityBox = document.getElementById("city-name");
let searchBtn = document.getElementById("city-search");
let tempSwitchBtn = document.querySelectorAll(".temp-switch .unit");
let displayBox = document.querySelector(".app-display");

const allAppFunctions = (() => {
  const getLocationTemp = async (city) => {
    const apiKey = "XBDEBF3SCZB9EES6KY82SN55E";
    const respond = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`,
      { mode: "cors" }
    );
    const respondData = await respond.json();

    displayBox.innerHTML = "";
    displayAppContent(respondData);

    tempSwitchBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        tempSwitchBtn.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
        switchTempUnits(respondData.days);
      });
    });
  };

  const displayAppContent = (data) => {
    let days = data.days;
    let today = new Date(days[0].datetime);

    createElement("h2", displayBox);
    let header = document.querySelector(".app-display h2");

    let todaydate = today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      weekday: "long",
    });

    createElement("span", header, todaydate, "class", "today-date");

    createElement("span", header, data.address, "class", "city-name");

    createElement("div", displayBox, "", "class", "today-details");
    let todayDetails = document.querySelector(".today-details");

    createElement("div", todayDetails);
    let leftSide = document.querySelector(".today-details > div:first-of-type");

    createElement("div", todayDetails);
    let rightSide = document.querySelector(".today-details > div:last-of-type");

    createImg(days[0].icon, leftSide, 280);

    createElement("div", leftSide, days[0].conditions, "id", "today-condition");

    createElement("div", leftSide, days[0].temp, "class", "day-temp");

    let windText = `Wind Speed <span class="value">${days[0].windspeed} m/s</span>`;
    createElement("div", rightSide, windText, "class", "wind-speed");

    let humidityText = `Humidity <span class="value">${days[0].humidity}%</span>`;
    createElement("div", rightSide, humidityText, "class", "humidity");

    let pressureText = `Pressure <span class="value">${days[0].pressure} mmHg</span>`;
    createElement("div", rightSide, pressureText, "class", "pressure");

    let dewText = `Dew <span class="value">${days[0].dew}</span>`;
    createElement("div", rightSide, dewText, "class", "dew");

    let sunriseText = `Sunrise <span class="value">${days[0].sunrise}</span>`;
    createElement("div", rightSide, sunriseText, "class", "sunrise");

    let sunsetText = `Sunset <span class="value">${days[0].sunset}</span>`;
    createElement("div", rightSide, sunsetText, "class", "sunset");

    createElement("div", displayBox, "", "class", "days-details");
    let daysDetails = document.querySelector(".app-display .days-details");

    for (let i = 1; i < 7; i++) {
      createElement("div", daysDetails, "", "id", `day-${i + 1}`);
      let daysBox = document.getElementById(`day-${i + 1}`);
      createImg(days[i].icon, daysBox, 64);
      let date = new Date(days[i].datetime);
      let specDay = date.toLocaleDateString("en-US", {
        weekday: "long",
      });
      createElement("div", daysBox, specDay, "class", "day-name");
      createElement("div", daysBox, days[i].temp, "class", "day-temp");
    }

    switchTempUnits(days);
  };

  const switchTempUnits = (days) => {
    let dewValue = document.querySelector(".dew .value");
    let daysTemp = document.querySelectorAll(".app-display .day-temp");
    tempSwitchBtn.forEach((btn) => {
      if (btn.classList.contains("active")) {
        if (btn.dataset.unit === "C") {
          dewValue.innerHTML = `${(((days[0].dew - 32) * 5) / 9).toFixed(
            1
          )} °C`;
          daysTemp.forEach((day, index) => {
            day.innerHTML = `${(((days[index].temp - 32) * 5) / 9).toFixed(
              1
            )} °C`;
          });
        } else {
          dewValue.innerHTML = `${days[0].dew} °F`;
          daysTemp.forEach((day, index) => {
            day.innerHTML = `${days[index].temp} °F`;
          });
        }
      }
    });
  };

  const createElement = (
    type,
    container,
    text = "",
    atr = "",
    atrValue = ""
  ) => {
    let element = document.createElement(`${type}`);
    if (atr) {
      element.setAttribute(`${atr}`, atrValue);
    }
    if (text) element.innerHTML = text;
    container.appendChild(element);
  };

  const createImg = (imgName, container, size = 64) => {
    import(`../assets/weather-icons/${imgName}.svg`).then((module) => {
      addImg(module.default);
    });

    const addImg = (src) => {
      let img = document.createElement("img");
      img.src = src;
      img.alt = imgName;
      img.width = size;
      container.prepend(img);
    };
  };

  return { getLocationTemp };
})();

searchBtn.addEventListener("click", (e) => {
  if (cityBox.value) {
    e.preventDefault();
    allAppFunctions.getLocationTemp(cityBox.value);
    cityBox.value = "";
  }
});

allAppFunctions.getLocationTemp("cairo");
