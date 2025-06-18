import "./style.css";
import Logo from "/images/logo.png";
import start from "/images/start.png";
import { startGame } from "./game.js";
// import { setupCounter } from './counter.js'

document.querySelector("#app").innerHTML = `

    
    <figure id="logo">
      <img src="${Logo}" class="logo" alt="logo" />
  </figure>

    <div id="game">
      <figure id="start">
        <img src="${start}"  class="start" alt="demarrer" />
      </figure>
    </div>

`;

// Fonction pour créer un label et un input
function createLabeledInput(labelText, inputAttributes) {
  const container = document.createElement("div");
  container.id="setting";
  const label = document.createElement("label");
  label.setAttribute("for", inputAttributes.id);
  label.textContent = labelText;
  const input = document.createElement("input");
  Object.entries(inputAttributes).forEach(([key, value]) => {
    input.setAttribute(key, value);
  });
  container.appendChild(label);
  container.appendChild(input);
  return container;
}
document.getElementById("app").appendChild(
  createLabeledInput("Size of the board: ", {
    id: "boardSize",
    name: "boardSize",
    type: "number",
    min: 4,
    max: 30,
    value: 4,
    class: "boardSize",
  })
);

document.getElementById("start").addEventListener("click", startGame);
