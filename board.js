

class Board{
    constructor(width, x, y){
        this.board = new Array(x);
        for(let i = 0; i < x; i++){
            this.board[i] = new Array(y);
        }
        
        this.numX = x;
        this.numY = y;
        this.blockSize = width / x;

        this.pieces = [IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, SPiece]
        this.curPiece;
        this.generatePiece();


    }

    drawBoard(){
        for (let j = 0; j < this.numY; j++){
            for (let i = 0; i < this.numX; i++){
                if (this.board[i][j] instanceof Block){
                    this.board[i][j].draw();

                }
                else{
                    fill(255);
                    square(i * this.blockSize, j * this.blockSize, this.blockSize);
                }     
            }
        }
    }

    generatePiece(){
        this.curPiece = null;
        let piece = this.pieces[Math.floor(Math.random()*this.pieces.length)]
        this.curPiece = new piece(this.numX, this.blockSize);
        

        let coords = this.curPiece.getCoords();
        for (const c of coords){
            if (this.board[c[0]][c[1]] instanceof Block){
                this.clearBoard();
                return;
            }
        }
    }

    clearBoard(){ //WHAT IN THE EVERLIVING FUCK
        for (let i = 0; i < this.numX; i++){
            for (let j = 0; j < this.numY; j++){
                this.board[i][j] = 5;
                // this.board[i][j] = null;
            }
        }
        // this.generatePiece();
        console.log(this.board);
    }

    drawPiece(){
        this.curPiece.draw();
    }

    checkClear(){
        let full = true;
        for (let i = 0; i < this.numY; i++){
            for (const arr of this.board){
                if (arr[i] == null){
                    full = false;
                }
            }
            
            if (full){
                this.clearRow(i);
                this.moveBlocksDown(i);

            }
            full = true;
        }
    }

    clearRow(level){
        let y = level;

        for (let i = 0; i < this.numX; i++){
            this.board[i][y] = null;
        }
    }

    moveBlocksDown(level){
        let y = level;
        while (y > 0){
            for (let i = 0; i < this.numX; i++){
                if (this.board[i][y-1] instanceof Block){
                    this.board[i][y] = new Block(i, y)
                    this.board[i][y-1] = null;
                }
            }
            y -= 1;
        }
        
    }

    hardDrop(){
        while (!this.checkCollide()){
            this.curPiece.moveDown();
        }
    }


    checkCollide(){
        let coords = this.curPiece.getCoords();

        for (const c of coords){
            if (c[1] == this.numY - 1){
                this.generatePiece();
                this.addDeadPiece(coords);
                return true;
            }
            
            else if (this.board[c[0]][c[1] + 1] != null){
                this.generatePiece();
                this.addDeadPiece(coords);
                return true;
            }
        }
        return false;
    }

    makeRotationValid(){
        //DOES NOT WORK

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
                else if (this.board[c[0] - 1][c[1]] instanceof Block){
                    return;
                }
            }
        }
        else if(keyCode === RIGHT_ARROW){
            for (const c of coords){
                if (c[0] >= this.numX - 1){
                    return;
                }
                else if (this.board[c[0] + 1][c[1]] instanceof Block){
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
        else if (keyCode === 90){
            this.curPiece.rotateLeft();
            this.makeRotationValid();
        }
        else if (keyCode === 32){
            this.hardDrop();
        }

        else if (keyCode === 82){
            console.log(this.board);
        }


    }


}