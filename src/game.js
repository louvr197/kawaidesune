// Liste des noms d'animaux (sans extension)
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

// Récupère la taille de la fenêtre pour adapter la grille
const width = window.innerWidth;
const height = window.innerHeight;

// Chemin de l'image du dos des cartes
const back = "/images/animals/back.jpeg";

let lastFlipped = -1; // Index de la dernière carte retournée
let locked = 0; // Indique si le jeu est verrouillé (empêche de retourner plus de 2 cartes)
let randomizedBoard = []; // Plateau mélangé
let flipped = []; // Tableau d'état des cartes (0 = face cachée, 1 = trouvée)

// Fonction pour démarrer une nouvelle partie
export function startGame() {
  document.getElementById("game").innerHTML = "";
  setupBoard(boardSize.value - boardSize.value%2);
}

// Prépare le plateau de jeu avec un nombre de cartes donné (par défaut 18)
function setupBoard(boardSize = 18) {
  console.log(sizing(boardSize)); // Affiche la taille de la grille pour debug
  // Sélectionne aléatoirement la moitié des images nécessaires
  let imagesSelected = [...images]
    .sort(() => Math.random() - 0.5)
    .slice(0, boardSize / 2);
  // Duplique et mélange les images pour créer les paires
  randomizedBoard = imagesSelected
    .concat(imagesSelected)
    .sort(() => Math.random() - 0.5);
  // Initialise l'état des cartes à 0 (non trouvées)
  flipped = Array(randomizedBoard.length).fill(0);
  let game = document.getElementById("game");
  game.innerHTML = ""; // Vide le plateau précédent
  game.style.display = "grid";
  // Définit le nombre de colonnes selon la fonction sizing
  game.style.gridTemplateColumns =
    "repeat(" + sizing(boardSize) + ", 1fr)";
  // Crée chaque carte du plateau
  for (let i = 0; i < boardSize; i++) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.id = "card" + i;
    game.appendChild(figure);
    figure.appendChild(img);
    img.src = back; // Affiche le dos de la carte
    img.addEventListener("click", () => clickImage(i, img)); // Ajoute l'événement de clic
  }
}

// Calcule le nombre de colonnes pour la grille en fonction de la taille de la fenêtre
function sizing(boardSize) {
  let root = Math.floor(Math.sqrt(boardSize));
  // Si la fenêtre est plus large que haute, on privilégie plus de colonnes
  if (width > height) return root + boardSize % root;
  // Sinon, on privilégie plus de lignes
  else return boardSize / (root + boardSize % root);
}

// Fonction appelée lorsqu'on clique sur une carte
function clickImage(imageIndex, elem) {
  console.log("last", lastFlipped);
  console.log("lock", locked);
  // Si la carte n'est pas déjà trouvée et que le jeu n'est pas verrouillé
  if (flipped[imageIndex] === 0 && locked === 0) {
    if (lastFlipped === -1) {
      // Première carte retournée
      lastFlipped = imageIndex;
      elem.src = "/images/animals/" + randomizedBoard[imageIndex] + ".jpeg";
    } else {
      let lastFlippedElement = document.getElementById("card" + lastFlipped);
      if (randomizedBoard[lastFlipped] === randomizedBoard[imageIndex]) {
        // Les deux cartes sont identiques : paire trouvée
        elem.src = "/images/animals/" + randomizedBoard[imageIndex] + ".jpeg";
        flipped[imageIndex] = 1;
        flipped[lastFlipped] = 1;
        lastFlipped = -1;
        // Vérifie si toutes les paires sont trouvées
        if (!flipped.some((value) => value == 0)) win();
      } else if (imageIndex === lastFlipped) {
        // On a cliqué deux fois sur la même carte : on la retourne
        elem.src = back;
        lastFlipped = -1;
      } else {
        // Les deux cartes sont différentes : on les retourne après une courte pause
        elem.src = "/images/animals/" + randomizedBoard[imageIndex] + ".jpeg";
        elem.classList.add("wobble");
        lastFlippedElement.classList.add("wobble");
        lastFlipped = -1;
        locked = 1; // Verrouille le jeu
        console.log("lock");
        setTimeout(() => {
          lastFlippedElement.src = back;
          elem.src = back;
          elem.classList.remove("wobble");
          lastFlippedElement.classList.remove("wobble");
          locked = 0; // Déverrouille le jeu
          console.log("unlock");
        }, 1000);
      }
    }
  } else {
    // Si la carte est déjà trouvée ou le jeu est verrouillé, animation d'erreur
    elem.classList.add("wobble");
    setTimeout(() => elem.classList.remove("wobble"), 500);
  }
}

// Fonction appelée quand toutes les paires sont trouvées
function win() {
  console.log("winner");
  let zone = document.getElementById("game");
  zone.style.gridTemplateColumns = "1fr";
  zone.innerHTML = "";
  // Affiche l'image de victoire
  let message = document.createElement("figure");
  zone.appendChild(message);
  let imgWin = document.createElement("img");
  imgWin.src = "/images/win.png";
  message.appendChild(imgWin);
  // Affiche le bouton pour recommencer
  message = document.createElement("figure");
  zone.appendChild(message);
  imgWin = document.createElement("img");
  imgWin.src = "/images/restart.png";
  message.appendChild(imgWin);
  message.addEventListener("click", startGame);
}

