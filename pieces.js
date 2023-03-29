
class Piece{
    constructor(color){
        this.blocks = new Array(0);
        this.rotations = new Array(0);
        this.color = color;
    }

    draw(){
        for (const block of this.blocks){
            // if (block instanceof Block){
            block.draw();
            // }    
        }
    }
    
    moveDown(){
        for (const block of this.blocks){
            block.moveDown();
        }
    }

    moveRight(){
        for (const block of this.blocks){
            block.moveRight();
        }
    }

    moveLeft(){        
        for (const block of this.blocks){
            block.moveLeft();
        }
    }

    moveUp(){
        for (const block of this.blocks){
            block.moveUp();
        }
    }

    rotateRight(){
        for (let i = 0; i < this.blocks.length; i++){
            this.blocks[i].addToCoords(this.rotations[this.curR][i][0], this.rotations[this.curR][i][1]);
        }

        this.curR += 1;
        if (this.curR == this.rotations.length){
            this.curR = 0;
        }
    }

    rotateLeft(){
        this.curR -= 1;
        if (this.curR == -1){
            this.curR = this.rotations.length - 1;
        }

        for (let i = 0; i < this.blocks.length; i++){
            this.blocks[i].addToCoords(-this.rotations[this.curR][i][0], -this.rotations[this.curR][i][1]);
        }
    }


    getCoords(){
        let posList = new Array(0);
        for (const block of this.blocks){
            posList.push(block.getCoords());
        }
        return posList;
    }

    addToCoords(x, y){
        for (const block of this.blocks){
            block.addToCoords(x, y);
        }
    }

}


class IPiece extends Piece{
    constructor(startX, blockSize){
        let color = '#01EDFA';
        super(color);
        let first = Math.floor(startX / 2) - 2
        this.blocks.push(new Block(first, 0, blockSize, color));
        this.blocks.push(new Block(first + 1, 0, blockSize,color));
        this.blocks.push(new Block(first + 2, 0, blockSize,color));
        this.blocks.push(new Block(first + 3, 0, blockSize,color));   

        this.curR = 0;
        this.rotations.push([[2, -1], [1, 0], [0, 1], [-1, 2]]);
        this.rotations.push([[1, 2], [0, 1], [-1, 0], [-2, -1]]);
        this.rotations.push([[-2, 1], [-1, 0], [0, -1], [1, -2]]);
        this.rotations.push([[-1, -2], [0, -1], [1, 0], [2, 1]]); 
    }
}

class JPiece extends Piece{
    constructor(startX, blockSize){
        let color = '#0077D3';
        super(color);
        let first = Math.floor(startX / 2) - 1;
        this.blocks.push(new Block(first, 0, blockSize, color));
        this.blocks.push(new Block(first, 1, blockSize, color));
        this.blocks.push(new Block(first + 1, 1, blockSize, color));
        this.blocks.push(new Block(first + 2, 1, blockSize, color));   

        this.curR = 0;
        this.rotations.push([[2, 0], [1, -1], [0, 0], [-1, 1]]);
        this.rotations.push([[0, 2], [1, 1], [0, 0], [-1, -1]]);
        this.rotations.push([[-2, 0], [-1, 1], [0, 0], [1, -1]]);
        this.rotations.push([[0, -2], [-1, -1], [0, 0], [1, 1]]); 
    }
}

class LPiece extends Piece{
    constructor(startX, blockSize){
        let color = '#FF910C';
        super(color);
        let first = Math.floor(startX / 2) - 1;
        this.blocks.push(new Block(first, 1, blockSize, color));
        this.blocks.push(new Block(first + 1, 1, blockSize, color));
        this.blocks.push(new Block(first + 2, 0, blockSize, color));
        this.blocks.push(new Block(first + 2, 1, blockSize, color));   

        this.curR = 0;
        this.rotations.push([[1, -1], [0, 0], [0, 2], [-1, 1]]);
        this.rotations.push([[1, 1], [0, 0], [-2, 0], [-1, -1]]);
        this.rotations.push([[-1, 1], [0, 0], [0, -2], [1, -1]]);
        this.rotations.push([[-1, -1], [0, 0], [2, 0], [1, 1]]); 
    }
}

class OPiece extends Piece{
    constructor(startX, blockSize){
        let color = '#FEFB34';
        super(color);
        let first = Math.floor(startX / 2) - 1;
        this.blocks.push(new Block(first, 0, blockSize, color));
        this.blocks.push(new Block(first + 1, 0, blockSize, color));
        this.blocks.push(new Block(first, 1, blockSize, color));
        this.blocks.push(new Block(first + 1, 1, blockSize, color));   
    }

    rotateRight(){}
    rotateLeft(){}
}

class SPiece extends Piece{
    constructor(startX, blockSize){
        let color = '#53DA3F';
        super(color);
        let first = Math.floor(startX / 2) - 1;
        this.blocks.push(new Block(first, 1, blockSize, color));
        this.blocks.push(new Block(first + 1, 0, blockSize, color));
        this.blocks.push(new Block(first + 1, 1, blockSize, color));
        this.blocks.push(new Block(first + 2, 0, blockSize, color));   

        this.curR = 0;
        this.rotations.push([[1, -1], [1, 1], [0, 0], [0, 2]]);
        this.rotations.push([[1, 1], [-1, 1], [0, 0], [-2, 0]]);
        this.rotations.push([[-1, 1], [-1, -1], [0, 0], [0, -2]]);
        this.rotations.push([[-1, -1], [1, -1], [0, 0], [2, 0]]); 
    }
}

class TPiece extends Piece{
    constructor(startX, blockSize){
        let color = '#DD0AB2';
        super(color);
        let first = Math.floor(startX / 2) - 1;
        this.blocks.push(new Block(first, 1, blockSize, color));
        this.blocks.push(new Block(first + 1, 0, blockSize, color));
        this.blocks.push(new Block(first + 1, 1, blockSize, color));
        this.blocks.push(new Block(first + 2, 1, blockSize, color));   

        this.curR = 0;
        this.rotations.push([[1, -1], [1, 1], [0, 0], [-1, 1]]);
        this.rotations.push([[1, 1], [-1, 1], [0, 0], [-1, -1]]);
        this.rotations.push([[-1, 1], [-1, -1], [0, 0], [1, -1]]);
        this.rotations.push([[-1, -1], [1, -1], [0, 0], [1, 1]]); 
    }
}

class ZPiece extends Piece{
    constructor(startX, blockSize){
        let color = '#EA141C';
        super(color);
        let first = Math.floor(startX / 2) - 1;
        this.blocks.push(new Block(first, 0, blockSize, color));
        this.blocks.push(new Block(first + 1, 0, blockSize, color));
        this.blocks.push(new Block(first + 1, 1, blockSize, color));
        this.blocks.push(new Block(first + 2, 1, blockSize, color));   

        this.curR = 0;
        this.rotations.push([[2, 0], [1, 1], [0, 0], [-1, 1]]);
        this.rotations.push([[0, 2], [-1, 1], [0, 0], [-1, -1]]);
        this.rotations.push([[-2, 0], [-1, -1], [0, 0], [1, -1]]);
        this.rotations.push([[0, -2], [1, -1], [0, 0], [1, 1]]); 
    }
}


