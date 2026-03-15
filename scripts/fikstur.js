const spanElement = document.querySelectorAll(".option-fikstur");
const buttonElement = document.querySelector(".select-division");
const optionsBtn = document.querySelector(".options-list");

const displayMatchTemplate = document.querySelector("#match-display-template");
const displayMatchContainer = document.querySelector(
  ".displayed-matches-container",
);
const divisionTitle = document.querySelector(".Title");
let allFixtures = [];

fetch("/.netlify/functions/get-fixtures")
  .then((res) => res.json())
  .then((data) => {
    allFixtures = data.response;
    renderMatches(allFixtures);
  })
  .catch((err) => console.error("Fixtures fetch error:", err));

function closeDropdown() {
  spanElement.forEach((el) => el.classList.toggle("visible"));
  buttonElement.classList.toggle("open");
}

function filterData(leagueId) {
  return allFixtures.filter((object) => object.league.id === leagueId);
}

function renderMatches(fixtures) {
  displayMatchContainer.innerHTML = "";
  fixtures.forEach((object) => {
    const template = displayMatchTemplate.content.cloneNode(true);
    template.querySelector(".team-1").textContent = object.teams.home.name;
    template.querySelector(".team-1-score").textContent =
      object.score.fulltime.home;
    template.querySelector(".team-2-score").textContent =
      object.score.fulltime.away;
    template.querySelector(".team-2").textContent = object.teams.away.name;
    displayMatchContainer.appendChild(template);
  });
}

buttonElement.addEventListener("click", () => {
  spanElement.forEach((element) => {
    element.classList.toggle("visible");
  });
  buttonElement.classList.toggle("open");
});

optionsBtn.addEventListener("click", (event) => {
  switch (event.target.id) {
    case "super-lig":
      divisionTitle.textContent = "SÜPER LİG";
      renderMatches(filterData(203));
      closeDropdown();
      break;

    case "ziraat":
      divisionTitle.textContent = "ZİRAAT KUPASI";
      renderMatches(filterData(206));
      closeDropdown();
      break;

    case "avrupa-ligi":
      divisionTitle.textContent = "AVRUPA LİGİ";
      renderMatches(filterData(3));
      closeDropdown();
      break;
    default:
      break;
  }
});
