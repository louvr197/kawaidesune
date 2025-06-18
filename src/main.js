import "./style.css";
import Logo from "/images/logo.png";
import start from "/images/start.png";
import { startGame } from "./game.js";
// import { setupCounter } from './counter.js'

document.querySelector("#app").innerHTML = `
  <div>
    
    <figure>
      <img src="${Logo}" class="logo" alt="logo" />
  </figure>

    <div id="game">
      <img src="${start}" id="start" class="start" alt="demarrer" />
    </div>

  </div>
`;

document.getElementById("start").addEventListener("click", startGame);
