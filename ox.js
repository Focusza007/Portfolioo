const call = document.querySelectorAll(".p")
const texttotog = document.getElementById("totogtext")
const texttotogx =document.getElementById("totog")
const human = "x"
const Ai = "o"
let currentPlayer = human
let  boxs = Array(9).fill(null)
let Stopgame  = true

let win = [
  [0,1,2],[0,3,6],[0,4,8],
  [3,4,5],[1,4,7],[2,4,6],
  [6,7,8],[2,5,8]
]

function winconditions(){

  for(let [a,b,c] of win){

    if(boxs[a]!==null&&boxs[a]===boxs[b]&&boxs[a]===boxs[c]) return boxs[a]
  }
  
  return null
}
function AiMove(){

if(Stopgame)return

for(let[a,b,c] of win ){
  //หากชนะจะลง
  if(boxs[a]=== Ai&&boxs[b]=== Ai&&boxs[c]=== null)return Movegame(c);
  if(boxs[c]=== Ai&&boxs[a]=== Ai&&boxs[b]=== null)return  Movegame(b);
  if(boxs[b]=== Ai&&boxs[c]=== Ai&&boxs[a]=== null)return Movegame(a);
//หากแพ้ให้บล็อก
  if(boxs[a]=== human&&boxs[b]=== human&&boxs[c]=== null)return Movegame(c);
  if(boxs[c]=== human&&boxs[a]=== human&&boxs[b]=== null)return Movegame(b);
  if(boxs[b]=== human&&boxs[c]=== human&&boxs[a]=== null)return Movegame(a);
}

 let v = boxs.map((box,i)=> box === null? i:null).filter((out)=> out !==null)
 let random = v[Math.floor(Math.random() * v.length)]
 Movegame(random)
}

function winner(){
  let wins = winconditions()

  if(wins){
    Stopgame =true
    texttotogx.style.display ="none"
    texttotog.textContent = "ผุ้เล่น" + wins + "ชนะ"
  }else if(!boxs.includes(null)){
    texttotogx.style.display ="none"
    texttotog.textContent = "เสมอ"
  }

}

function Movegame(index){

 if(boxs[index]!==null)return;

  boxs[index] = currentPlayer 
  currentPlayer = currentPlayer === human ? Ai:human
  
  totogtext()
 
  
 display()
 if(currentPlayer === Ai){
  setTimeout(() => { AiMove() }, 500);
}
 winner()
}

function start(){
  

if(Stopgame)return
totogtext()
}
function Reset(){
  boxs.fill(null)
  currentPlayer="x"
  Stopgame = false
  totogtext()
  display()
}

function totogtext(){
  texttotogx.style.display ="block"
  texttotog.textContent =  currentPlayer
  
}
function display(){
  call.forEach((callt,i)=>{
    callt.textContent = boxs[i] || "";
  })
}

call.forEach((calls)=>{
  calls.addEventListener("click",()=>{
    if(currentPlayer !==human || Stopgame )return
      const index = parseInt(calls.dataset.index)
   Movegame(index)
  
  })
})
texttotog.textContent =  ""
display()