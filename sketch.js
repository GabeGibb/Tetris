


let HEIGHT = window.innerHeight * .9;
let WIDTH = HEIGHT * 1/2;

let XBLOCKS = 10;
let YBLOCKS = 20;

let BORDER = 3
let board = new Board(WIDTH, XBLOCKS, YBLOCKS);

let DELAY = 20;
let delay = DELAY;


function setup() {
  createCanvas(WIDTH, HEIGHT);

  strokeWeight(BORDER);
  frameRate(5);
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