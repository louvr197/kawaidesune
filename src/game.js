const images = [
  "bunny",
  "dog",
  "fox",
  "mouse",
  "owl",
  "whale",
  "alpaca",
  "cat",
  "chick",
  "hedgehog",
  "koala",
  "panda",
  "parrot",
  "penguin",
  "raccoon",
  "shark",
  "sloth",
  "tiger",
];
const back = "/images/animals/back.jpeg";
let lastFlipped = -1;
let locked = 0;
let randomizedBoard = [];
let flipped = [];
// Create an array of image URLs based on the image names
// const imagesUrl = images.map(name => `/images/animals/${name}.jpeg`);

export function startGame() {
  // console.log(imagesUrl);
  document.getElementById("game").innerHTML="";
  setupBoard();
}
function setupBoard(boardSize = 12) {
  let imagesSelected = images
    .sort(() => Math.random() - 0.5)
    .slice(0, boardSize / 2);
  randomizedBoard = imagesSelected
    .concat(imagesSelected)
    .sort(() => Math.random() - 0.5);
  flipped = Array(randomizedBoard.length).fill(0);
  let game = document.getElementById("game");
  game.innerHTML = ""; // Clear previous board content
  game.style.display = "grid";
  game.style.gridTemplateColumns =
    "repeat(" + Math.floor(Math.sqrt(boardSize) + 1) + ", 1fr)";
  for (let i = 0; i < boardSize; i++) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.id = "card" + i;
    game.appendChild(figure);
    figure.appendChild(img);
    img.src = back;
    img.addEventListener("click", () => clickImage(i, img));
  }
}

function clickImage(imageIndex, elem) {
  console.log("last", lastFlipped);
  console.log("lock", locked);
  if (flipped[imageIndex] === 0 && locked === 0) {
    let lastFlippedElement = document.getElementById("card" + lastFlipped);
    if (lastFlipped === -1) {
      lastFlipped = imageIndex;
      elem.src = "/images/animals/" + randomizedBoard[imageIndex] + ".jpeg";
    } else {
      if (randomizedBoard[lastFlipped] === randomizedBoard[imageIndex]) {
        elem.src = "/images/animals/" + randomizedBoard[imageIndex] + ".jpeg";
        flipped[imageIndex] = 1;
        flipped[lastFlipped] = 1;
        lastFlipped = -1;
        if (!flipped.some((value) => value == 0)) gagne();
      } else if (imageIndex === lastFlipped) {
        elem.src = back;
        lastFlipped = -1;
      } else {
        elem.src = "/images/animals/" + randomizedBoard[imageIndex] + ".jpeg";
        elem.classList.add("wobble");
        lastFlippedElement.classList.add("wobble");
        lastFlipped = -1;
        locked = 1;
        console.log("lock");
        setTimeout(() => {
          lastFlippedElement.src = back;
          elem.src = back;

          elem.classList.remove("wobble");
          lastFlippedElement.classList.remove("wobble");
          locked = 0;
          console.log("unlock");
        }, 2000);
      }
    }
  } else {
    elem.classList.add("wobble");
    setTimeout(() => elem.classList.remove("wobble"), 500);
  }
}
function gagne() {
  console.log("winner");
  let zone = document.getElementById("game");

  zone.style.gridTemplateColumns = "1fr 1fr";
  zone.innerHTML = "";
  let message = document.createElement("figure");
  zone.appendChild(message);
  let imgGagne = document.createElement("img");
  imgGagne.src = "/images/win.png";
  message.appendChild(imgGagne);
  message = document.createElement("figure");
  zone.appendChild(message);
  imgGagne = document.createElement("img");
  imgGagne.src = "/images/restart.png";
  message.appendChild(imgGagne);
  message.addEventListener("click", startGame);
}
