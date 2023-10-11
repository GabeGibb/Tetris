let HEIGHT = window.innerHeight * 0.9;
let WIDTH = HEIGHT * 1/2;

let XBLOCKS = 10;
let YBLOCKS = 20;

let BORDER = 3
// let board = new Board(WIDTH, XBLOCKS, YBLOCKS);

let DELAY = 20;
let delay = DELAY;

let ARR = 40;
let DAS = 200;
let SDF = 40;
let life = 5;


function updateBoard(){

  board = new Board(HEIGHT, XBLOCKS, YBLOCKS, ARR, DAS, SDF, life);
}

updateBoard();
function setup() {
  createCanvas(WIDTH, HEIGHT);

  strokeWeight(BORDER);
  // frameRate(30);
}


function draw() {
  board.drawBoard();
  board.drawPiece();


  if (delay == 0){
    delay = DELAY;
    board.curPiece.moveDown();
  }
  delay -= 1

  board.checkCollide();
  board.checkDrop();
  board.checkClear();

}

function keyPressed(){
  board.handleInput();
}