const call = document.querySelectorAll(".p");
const texttotog = document.getElementById("totogtext");
const texttotogx = document.getElementById("totog");
const namemode = document.getElementById("namemode")
const human = "x";
const Ai = "o";
let currentPlayer = human;
let boxs = Array(9).fill(null);
let Stopgame = true
let w = false;
let lock = "ง่าย"
let g=0
let win = [
  [0, 1, 2],[0, 3, 6],[0, 4, 8],
  [3, 4, 5],[1, 4, 7],[2, 4, 6],
  [6, 7, 8],[2, 5, 8],
  
];

function winconditions() {
  for (let [a, b, c] of win) {
    if (boxs[a] !== null && boxs[a] === boxs[b] && boxs[a] === boxs[c])
      return boxs[a];
  }
  return null;
}
function none(){
if(boxs[4] && g===1){
let d =[0,2,6,8]
let arendom = d[Math.floor(Math.random()*d.length)]
Movegame(arendom)
}
}

function Ez(){
namemode.textContent = "Mode ง่าย"
return lock = "ง่าย"
}
function normal(){
namemode.textContent = "Mode ปกติ"
return lock = "ปกติ"
}
function AiMove() {
  if (Stopgame) return;
  if (lock ="ปกติ") {
    if (conditionAi()) return;
  }


 randomxo()

}
function conditionAi(){
   for (let [a, b, c] of win) {
    if (boxs[a] === Ai && boxs[b] === Ai && boxs[c] === null)
      return Movegame(c), true;
    if (boxs[c] === Ai && boxs[a] === Ai && boxs[b] === null)
      return Movegame(b), true;
    if (boxs[b] === Ai && boxs[c] === Ai && boxs[a] === null)
      return Movegame(a), true;

    if (boxs[a] === human && boxs[b] === human && boxs[c] === null)
      return Movegame(c), true;
    if (boxs[c] === human && boxs[a] === human && boxs[b] === null)
      return Movegame(b), true;
    if (boxs[b] === human && boxs[c] === human && boxs[a] === null)
      return Movegame(a), true;
  }
  return false;
}

function randomxo(){
 let v = boxs
    .map((box, i) => (box === null ? i : null))
    .filter((out) => out !== null);
  let random = v[Math.floor(Math.random() * v.length)];
  Movegame(random);
}
function winner() {
  let wins = winconditions();

  if (wins) {
    Stopgame = true;
    texttotogx.style.display = "none";
    texttotog.textContent = "ผุ้เล่น" + wins + "ชนะ";
    w = true;
  } else if (!boxs.includes(null)) {
    Stopgame = true;
    texttotogx.style.display = "none";
    texttotog.textContent = "เสมอ";
    w = true;
  }
}

function Movegame(index) {
  if (boxs[index] !== null) return;

  boxs[index] = currentPlayer;
  g++

  currentPlayer = currentPlayer === human ? Ai : human;

  totogtext();

  display();
  if (currentPlayer === Ai) {
    setTimeout(() => {
      AiMove();
    }, 500);
  }
  winner();
}

function start() {
  if (!w) {
    Stopgame = false;

    totogtext();
    texttotogx.style.display = "block";
  }
}
function Reset() {
  g = 0
  texttotogx.style.display = "none";
  boxs.fill(null);
  currentPlayer = "x";
  texttotog.textContent = "";
  Stopgame = true;
  w = false;

  display();
}

function totogtext() {
  texttotogx.style.display = "block";
  texttotog.textContent = currentPlayer;
}
function display() {
  call.forEach((callt, i) => {
    callt.textContent = boxs[i] || "";
  });
}

call.forEach((calls) => {
  calls.addEventListener("click", () => {
    if (currentPlayer !== human || Stopgame) return;
    const index = parseInt(calls.dataset.index);
    Movegame(index);
  });
});
texttotog.textContent = "";
Ez()
display();
