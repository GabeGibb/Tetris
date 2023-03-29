class Block{
    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }   

    addToCoords(x, y){
        this.x += x;
        this.y += y;

    }
    getCoords(){
        return [this.x, this.y];
    }
    draw(){
        fill(this.color);
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