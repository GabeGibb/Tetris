

class Board{
    constructor(width, height, x, y){
        this.board = new Array(x);
        for(let i = 0; i < x; i++){
            this.board[i] = new Array(y);
        }
        
        this.numX = x;
        this.numY = y;
        this.blockSize = width / x;

        this.curPiece;
        this.generatePiece();
    }

    drawBoard(){
        for (let j = 0; j < this.numY; j++){
            for (let i = 0; i < this.numX; i++){
                if (this.board[i][j] == null){
                    fill(255);
                    square(i * this.blockSize, j * this.blockSize, this.blockSize);
                }
                else{
                    this.board[i][j].draw();
                }   
            }
        }
    }

    generatePiece(){
        let x = this.blockSize * (this.numX / 2) - this.blockSize * 2;
        this.curPiece = new IPiece(x, 0, this.blockSize);
    }

    drawPiece(){
        this.curPiece.draw();
    }


    checkCollide(){
        let coords = this.curPiece.getCoords();

        for (const c of coords){
            if (c[1] == this.numY - 1){
                this.generatePiece();
                this.addDeadPiece(coords);
                return;
            }
            
            else if (this.board[c[0]][c[1] + 1] != null){
                this.generatePiece();
                this.addDeadPiece(coords);
                return;
            }
        }
    }

    makeRotationValid(){
        let coords = this.curPiece.getCoords();
        let c;
        for (let i = 0; i < coords.length; i++){
            c = coords[i]
            if (c[0] < 0){
                this.curPiece.addToCoords(1, 0);
                coords = this.curPiece.getCoords();
                c = coords[i]
            }

            if (c[0] >= this.numX){
                this.curPiece.addToCoords(-1, 0);
                coords = this.curPiece.getCoords();
                c = coords[i]
            }

            if (c[1] >= this.numY){
                this.curPiece.addToCoords(0, -1);
                coords = this.curPiece.getCoords();
                c = coords[i]
            }

            if (this.board?.[c[0]] && this.board[c[0]]?.[c[1]]){
                if (this.board[c[0]][c[1] + 1] != null){
                    this.curPiece.addToCoords(0, -1);
                    coords = this.curPiece.getCoords();
                    c = coords[i]
                }
            }
            
        }
    }


    addDeadPiece(coords){
        for (const c of coords){
            this.board[c[0]][c[1]] = new Block(c[0], c[1], this.blockSize);
        }
    }



    handleInput(){
        let coords = this.curPiece.getCoords();
        if (keyCode === LEFT_ARROW){
            for (const c of coords){
                if (c[0] <= 0){
                    return;
                }
            }
        }
        else if(keyCode === RIGHT_ARROW){
            for (const c of coords){
                if (c[0] >= this.numX - 1){
                    return;
                }
            }
        }


        if (keyCode === DOWN_ARROW){
            this.curPiece.moveDown();
        }
        else if (keyCode === RIGHT_ARROW){
            this.curPiece.moveRight();
        }
        else if (keyCode === LEFT_ARROW){
            this.curPiece.moveLeft();
        }
        else if (keyCode === UP_ARROW){
            this.curPiece.moveUp();
        }
        else if (keyCode === 88){
            this.curPiece.rotateRight();
            this.makeRotationValid();
        }



        else if (keyCode === 82){
            console.log(this.board);
        }


    }


}