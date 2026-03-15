let currentIndex = 0;
let squadPlayers = [];

const template = document.querySelector("#player-card-template");
const container = document.querySelector("#team-container");
const positionLabel = document.querySelector("#position-label");
const btnBefore = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");

const positions = ["Attacker", "Midfielder", "Defender", "Goalkeeper"];
const positionLabels = ["Forvetler", "Orta Saha", "Defans", "Kaleciler"];

fetch("/.netlify/functions/get-players")
  .then((res) => res.json())
  .then((data) => {
    console.log("Players response:", data);
    if (!Array.isArray(data)) {
      console.error("Unexpected response shape:", data);
      return;
    }
    squadPlayers = data;
    renderPage();
  })
  .catch((err) => console.error("Players fetch error:", err));

function renderPlayerCards(players) {
  container.innerHTML = "";
  players.forEach((player) => {
    const card = template.content.cloneNode(true);
    const nameParts = player.name.split(" ");
    const firstName = nameParts.slice(0, -1).join(" ");
    const lastName = nameParts[nameParts.length - 1];

    card.querySelector(".player-card-header--position").textContent = player.number;
    card.querySelector(".player-img").src = player.photo;
    card.querySelector(".player-img").alt = player.name;
    card.querySelector(".player-name--first").textContent = firstName;
    card.querySelector(".player-name--last").textContent = lastName;
    card.querySelector(".matches .stat--value").textContent = player.stats.appearances;
    card.querySelector(".goals .stat--value").textContent = player.stats.goals;
    card.querySelector(".assists .stat--value").textContent = player.stats.assists;
    card.querySelector(".minutes-played .stat--value").textContent = player.stats.minutes;

    container.appendChild(card);
  });
}

function renderPage() {
  positionLabel.textContent = positionLabels[currentIndex];
  const filtered = squadPlayers.filter(
    (player) => player.position === positions[currentIndex]
  );
  renderPlayerCards(filtered);
}

btnNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % positions.length;
  renderPage();
});

btnBefore.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + positions.length) % positions.length;
  renderPage();
});
