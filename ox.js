const call = document.querySelectorAll(".p");
const totogtext = document.getElementById("totogtext");

const human = "x";
const ai = "o";
let currentPlayer = human;
let stopgrem = false;

let boxs = Array(9).fill(null);

const win = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner() {
  for (let [a, b, c] of win) {
    if (boxs[a] && boxs[a] === boxs[b] && boxs[a] === boxs[c]) {
      return boxs[a];
    }
  }
  return null;
}

function Ai() {
  if (stopgrem) return;

  for (let [a, b, c] of win) {
    // try win
    if (boxs[a] === ai && boxs[b] === ai && boxs[c] === null) return makeMove(c);
    if (boxs[a] === ai && boxs[c] === ai && boxs[b] === null) return makeMove(b);
    if (boxs[b] === ai && boxs[c] === ai && boxs[a] === null) return makeMove(a);

    // block
    if (boxs[a] === human && boxs[b] === human && boxs[c] === null) return makeMove(c);
    if (boxs[a] === human && boxs[c] === human && boxs[b] === null) return makeMove(b);
    if (boxs[b] === human && boxs[c] === human && boxs[a] === null) return makeMove(a);
  }

  // random
  const empty = boxs.map((v, i) => v === null ? i : null).filter(i => i !== null);
  const rand = empty[Math.floor(Math.random() * empty.length)];
  makeMove(rand);
}

function makeMove(index) {
  if (boxs[index] !== null || stopgrem) return;

  boxs[index] = currentPlayer;
  display();

  let winr = winner();
  if (winr) {
    stopgrem = true;
    totogtext.textContent = "ชนะคือ " + winr;
    return;
  }else if(!boxs.includes(null)){
    stopgrem = true;
    totogtext.textContent = "เสมอ " ;
    return;
  }

  // toggle turn
  currentPlayer = currentPlayer === human ? ai : human;
  totogt();

  // AI move
  if (currentPlayer === ai) {
    setTimeout(() => Ai(), 500);
  }
}

function display() {
  call.forEach((el, i) => {
    el.textContent = boxs[i] || "";
  });
}

function totogt() {
  totogtext.textContent = "อยู่ในตาของ " + currentPlayer;
}

function Reset() {
  boxs.fill(null);
  currentPlayer = human;
  stopgrem = false;
  totogt();
  display();
}

call.forEach((el) => {
  el.addEventListener("click", () => {
    if (currentPlayer !== human || stopgrem) return;
    const index = parseInt(el.dataset.index);
    makeMove(index);
  });
});

totogt();
display();
