

class Board{
    constructor(width, x, y){
        this.board = new Array(x);
        for(let i = 0; i < x; i++){
            this.board[i] = new Array(y);
        }
        
        this.numX = x;
        this.numY = y;
        this.blockSize = width / x;

        this.pieces = [IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece];
        this.curBag = [];
        this.shuffleBag();
        this.curPiece;
        this.generatePiece();

        this.ARR = 20;
        this.DAS = 100;
        this.SDF = 40;

        this.curLife = 5;
        this.totalLife = 5;
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

    shuffleBag(){
        let i = 0;
        let bag = [...this.pieces];
        let index;
        while (bag.length > 0){
            index = Math.floor(Math.random()*(bag.length - 1));
            this.curBag.push(bag[index]);
            bag.splice(index, 1);
        }
    }

    generatePiece(){
        this.curPiece = null;
        if (this.curBag.length == 0){
            this.shuffleBag();
        }
        let piece = this.curBag.pop();    
        this.curPiece = new piece(this.numX, this.blockSize);
        

        let coords = this.curPiece.getCoords();
        for (const c of coords){
            if (this.board[c[0]][c[1]] instanceof Block){
                this.clearBoard();
                return;
            }
        }
    }

    clearBoard(){ //WHAT WHY DOES 5 MAKE IT WORK
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

    checkCollide(){
        let coords = this.curPiece.getCoords();

        for (const c of coords){
            if (c[1] == this.numY){
                this.curPiece.moveUp();
                this.curLife -= 1;
                // coords = this.curPiece.getCoords();
                // this.generatePiece();
                // this.addDeadPiece(coords);
                return true;
            }
            
            else if (this.board[c[0]][c[1]] != null){
                this.curPiece.moveUp();
                this.curLife -= 1;
                // coords = this.curPiece.getCoords();
                // this.generatePiece();
                // this.addDeadPiece(coords);
                return true;
            }
        }

        return false;
        
    }

    checkDrop(){
        console.log(this.curLife);
        if (this.curLife <= 0){
            this.curLife = this.totalLife;
            let coords = this.curPiece.getCoords();
            this.generatePiece();
            this.addDeadPiece(coords);
        }
        
    }



    makeRotationValid(){
        //DOES NOT WORK

        let coords = this.curPiece.getCoords();
        let c;
        for (let i = 0; i < coords.length; i++){
            c = coords[i]
            if (c[0] < 0){
                // this.curPiece.addToCoords(1, 0);
                // coords = this.curPiece.getCoords();
                // c = coords[i]
                return true;
            }

            if (c[0] >= this.numX){
                // this.curPiece.addToCoords(-1, 0);
                // coords = this.curPiece.getCoords();
                // c = coords[i]
                return true;
            }

            if (c[1] >= this.numY){
                // this.curPiece.addToCoords(0, -1);
                // coords = this.curPiece.getCoords();
                // c = coords[i]
                return true;
            }

            if (this.board?.[c[0]] && this.board[c[0]]?.[c[1]]){
                if (this.board[c[0]][c[1] + 1] != null){
                    // this.curPiece.addToCoords(0, -1);
                    // coords = this.curPiece.getCoords();
                    // c = coords[i]
                    return true;
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
        if (keyCode === DOWN_ARROW){
            this.softDrop();
        }
        if (keyCode === RIGHT_ARROW){
            this.pieceRight(true);
            setTimeout(()=>{
                this.pieceRight(false);
            }, this.DAS)  
        }
        if (keyIsDown(LEFT_ARROW)){
            this.pieceLeft(true);
            setTimeout(()=>{
                this.pieceLeft(false);
            }, this.DAS)  
        }
        // else if (keyCode === UP_ARROW){
        //     this.curPiece.moveUp();
        // }
        if (keyCode === 88){
            this.curPiece.rotateRight();
            if(this.makeRotationValid()){
                this.curPiece.rotateLeft();
            }
            
        }
        if (keyCode === 90){
            this.curPiece.rotateLeft();
            if(this.makeRotationValid()){
                this.curPiece.rotateRight();
            }
        }
        if (keyCode === 32){
            this.hardDrop();
        }

        if (keyCode === 82){
            console.log(this.board);
        }
    }

    pieceLeft(first){
    
        if (!keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)){
            return;
        }
        let coords = this.curPiece.getCoords();
        let shouldMove = true;
        for (const c of coords){
            if (c[0] <= 0){
                shouldMove = false;
            }
            else if (this.board[c[0] - 1][c[1]] instanceof Block){
                shouldMove = false;
            }
        }
        if(shouldMove){
            this.curPiece.moveLeft();
        }
        if (first){
            return;
        }
        setTimeout(()=>{
            this.pieceLeft(false);
        }, this.ARR)  
        
    }

    pieceRight(first){
        
        if (!keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)){
            return;
        }
        let coords = this.curPiece.getCoords();
        let shouldMove = true;
        for (const c of coords){
            if (c[0] >= this.numX - 1){
                shouldMove = false;
            }
            else if (this.board[c[0] + 1][c[1]] instanceof Block){
                shouldMove = false;
            }
        }
        if(shouldMove){
            this.curPiece.moveRight();
        }
        

        if (first){
            return;
        }
        setTimeout(()=>{
            this.pieceRight(false);
        }, this.ARR)  
    }

    softDrop(){

        if (!keyIsDown(DOWN_ARROW)){
            return;
        }
        this.curPiece.moveDown();
        this.checkCollide();
        this.checkDrop();

        setTimeout(()=>{
            this.softDrop();
        }, this.SDF) 
    }

    hardDrop(){
        while (!this.checkCollide()){
            this.curPiece.moveDown();
        }
        this.curLife = 0;
        this.checkDrop();
        // this.checkClear();
        
    }

}