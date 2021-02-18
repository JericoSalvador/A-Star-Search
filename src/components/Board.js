import { State } from './State'

export const boardstates = {
    wall : null,
    unvisited : 0,
    visited : 1,
    end: 3, 
    start: 4, 
    path:5,
}


export class Board {
    constructor(board){
        if(!board)
        {
            this.len = 4; 
            this.board = new Array(this.len * this.len).fill(boardstates.unvisited);
        }
        else{
            this.board = board//[...board]; 
            this.len = Math.sqrt(board.length);
        }
        this.start = new State([0,0])
        this.end = new State([this.len-1,this.len-1])
        this.setStart(this.start)
        this.setEnd(this.end)
    } 
    getChildren(state){
        const paths = this.getPaths(state); 
        
        const children = []; 
        let path;
        for(let i = 0; i < paths.length; i++){
            path = paths[i]; 
            if (this.checkPathAvailable(path))
                children.push(new State(path)); 
        }
        return children;
    }
    getPaths(state){
        const [xpos,ypos] = state.position;
        const paths = [];
        //check down
        if(xpos >= 1)
            paths.push([xpos-1,ypos]);
        //check up
        if(xpos < this.len - 1)
            paths.push([xpos+1,ypos]);
        //check left
        if(ypos>= 1)
            paths.push([xpos,ypos -1]);
        //check right
        if(ypos < this.len - 1)
            paths.push([xpos,ypos+1]);
        
        return paths;
    }
    setEnd(state){
        const [x,y] = this.end.position
        this.board[x* this.len + y] = boardstates.unvisited; 

        this.end = state
        const [xpos,ypos] = state.position;
        this.board[xpos * this.len + ypos] = boardstates.end; 
    }
    setStart(state){
        const [x,y] = this.start.position
        this.board[x* this.len + y] = boardstates.unvisited; 

        this.start = state
        const [xpos,ypos] = state.position;
        this.board[xpos * this.len + ypos] = boardstates.start; 
    }
    setVisit(state){
        const [xpos,ypos] = state.position;
        if(this.board[xpos * this.len + ypos] === boardstates.unvisited)
        this.board[xpos * this.len + ypos] = boardstates.visited; 
    }
    positionFromRowCol([row,col]){
        return row * this.len + col;
    }
    checkPathAvailable(path){
        const position = this.positionFromRowCol(path); 
        if (this.board[position] === boardstates.wall)
            return false; 
        return true; 
    }
    setPath(path){
        for(let i = 0; i < path.length; i++){
            const state = path[i]
            const [x,y] = state.position
            this.board[x * this.len + y] = boardstates.path
        }
    }
    reset(){
        for(let i = 0; i < this.board.length; i++){
            if(this.board[i] === boardstates.wall) continue
            if(this.board[i] !== boardstates.start && this.board[i] !== boardstates.end)
                this.board[i] = boardstates.unvisited
        }
    }
}