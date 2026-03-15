const standingRow = document.querySelector("#standings-table-row-template");
const standingsTable = document.querySelector("#standings-tbody");

function renderTables(data) {
  standingsTable.innerHTML = "";
  const standingsArray = data.response[0].league.standings[0];
  standingsArray.forEach((teamObject) => {
    const row = standingRow.content.cloneNode(true);
    row.querySelector(".position").textContent = teamObject.rank;
    row.querySelector(".col-team").textContent = teamObject.team.name;
    row.querySelector(".matches-played").textContent = teamObject.all.played;
    row.querySelector(".victory").textContent = teamObject.all.win;
    row.querySelector(".draw").textContent = teamObject.all.draw;
    row.querySelector(".defeat").textContent = teamObject.all.lose;
    row.querySelector(".goals-scored").textContent = teamObject.all.goals.for;
    row.querySelector(".goals-conceded").textContent = teamObject.all.goals.against;
    row.querySelector(".points-scored").textContent = teamObject.points;
    standingsTable.appendChild(row);
  });
}

fetch("/.netlify/functions/get-standings")
  .then((res) => res.json())
  .then((data) => renderTables(data))
  .catch((err) => console.error("Standings fetch error:", err));
