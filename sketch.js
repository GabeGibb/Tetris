


let HEIGHT = window.innerHeight * .9;
let WIDTH = HEIGHT * 1/2;
let BORDER = 3
let board = new Board(WIDTH, HEIGHT, 10, 20);

// let delay = 5;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  strokeWeight(BORDER);
}


function draw() {
  board.drawBoard();
  board.drawPiece();
  board.checkCollide();
  // if (delay == 0){
  //   delay = 5;
  //   board.curPiece.moveDown();
  // }
  // delay -= 1
}

function keyPressed(){
  board.handleInput();
}