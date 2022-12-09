class Block{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }   

    addToCoords(x, y){
        this.x += x;
        this.y += y;

    }
    getCoords(){
        return [this.x, this.y];
    }
    draw(){
        fill(0);
        square(this.x * this.size, this.y * this.size, this.size);
    }

    moveDown(){
        this.y += 1
    }
    moveRight(){
        this.x += 1
    }
    moveLeft(){
        this.x -= 1
    }

    moveUp(){
        this.y -= 1
    }
}