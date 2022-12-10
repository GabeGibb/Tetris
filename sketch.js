


let HEIGHT = window.innerHeight * .9;
let WIDTH = HEIGHT * 1/2;

let XBLOCKS = 10;
let YBLOCKS = 20;

let BORDER = 3
let board = new Board(WIDTH, XBLOCKS, YBLOCKS);

let delay = 30;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  strokeWeight(BORDER);
}


function draw() {
  board.drawBoard();
  board.drawPiece();
  board.checkCollide();
  board.checkClear();

  if (delay == 0){
    delay = 15;
    board.curPiece.moveDown();
  }
  delay -= 1
}

function keyPressed(){
  board.handleInput();
}