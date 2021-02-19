
export class State {
    constructor(position){
        if(!position)
            this.pos= [0,0]; 
        else
            this.pos= position;
    }
    setCurrentPosition(row, col){
        this.pos= [row,col];
    }
    equal(state){
        
        return this.pos[0] === state.position[0] && this.pos[1] === state.position[1]
    }
    get position(){
        return this.pos;
    }
    manhattanDistanceTo(other){
        const [x,y] = this.position;
        const [xx,yy] = other.position; 

        const distance = Math.abs(x - xx) + Math.abs(y - yy)
        return distance; 
    }
    euclideanDistanceTo(other){
        const [x,y] = this.position;
        const [xx,yy] = other.position; 

        return Math.sqrt((x-xx)*(x - xx) + (y-yy)*(y - yy))
    }

}
