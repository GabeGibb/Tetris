
class Piece{
    constructor(){
        this.blocks = new Array(0);
        this.rotations = new Array(0);
    }

    draw(){
        for (const block of this.blocks){
            if (block instanceof Block){
                block.draw();
            }    
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
    constructor(startX, startY, blockSize){
        super();
        this.blocks.push(new Block(3, 0, blockSize));
        this.blocks.push(new Block(4, 0, blockSize));
        this.blocks.push(new Block(5, 0, blockSize));
        this.blocks.push(new Block(6, 0, blockSize));   

        this.curR = 0;
        this.rotations.push([[2, -1], [1, 0], [0, 1], [-1, 2]]);

        this.rotations.push([[1, 2], [0, 1], [-1, 0], [-2, -1]]);

        this.rotations.push([[-2, 1], [-1, 0], [0, -1], [1, -2]]);

        this.rotations.push([[-1, -2], [0, -1], [1, 0], [2, 1]]);
        
    }
    
}