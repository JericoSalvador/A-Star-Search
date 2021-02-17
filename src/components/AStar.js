import { Board, boardstates } from './Board'
import { State } from './State'
import { PriorityQueue } from './PriorityQueue'
import { BoardView } from '../views/BoardView'
import React from 'react'

export class AStar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(new Array(5*5).fill(boardstates.unvisited)),
            start: new State([0,0]),
            end: new State([4,4]),
        }
        console.log(this.state)
        this.state.board.setStart(this.state.start)
        this.state.board.setEnd(this.state.end)
        this.state.board.board[13] = boardstates.wall;
        this.visitedStates = []; 
        this.priorityQ = new PriorityQueue();
        this.message = "Hello World";

        this.search = this.search.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    distance(state){
        return state.manhattanDistanceTo(this.state.end);
    }
    search(){
        const item = {state: this.state.start, path: []}
        this.priorityQ.enqueue(0,item); 
        while(!this.priorityQ.isEmpty){
            const priorityQueueItem = this.priorityQ.dequeue().item;
            const currentState = priorityQueueItem.state;
            const currentPath = priorityQueueItem.path;
            // console.log(currentState);
            // console.log(currentPath);
            this.visitedStates.push(currentState);
            // this.state.board.setVisit(currentState);

            const newPath = [...currentPath, currentState]

            const children = this.state.board.getChildren(currentState); 
            // console.log("children: ", children);
            for(let i = 0; i < children.length; i++){
                const child = children[i];
                if(this.visited(child))
                    continue; 
                // console.log("child: ", child);
                const newItem = {state: child, path:newPath};
                if(child.equal(this.state.end))
                    return([...newPath])
                
                const priority = this.distance(child); 
                this.priorityQ.enqueue(priority, newItem)
            }
        }
    }
    show(){
        for(let i = 0; i < this.visitedStates.length; i++)
        {
            const state = this.visitedStates[i]
            setTimeout(()=>{
                this.state.board.setVisit(state)
                this.setState({})
            },100 * i)
        }
    }
    visited(state){
        for(let i = 0; i < this.visitedStates.length; i++)
        {
            if(this.visitedStates[i].equal(state))
                return true;
        }
        return false; 
    }
    handleSearch(){
        const path = this.search()
        // this.state.board.setPath(path)
        this.show()
        setTimeout(()=>{
            if(!path)return
            this.state.board.setPath(path)
            this.setState({})
        },this.visitedStates.length * 100)
    }
    render(){
        return <div>
            <h1>A-star</h1>
            <BoardView board={this.state.board.board} />
            <div className="message">
                <p>{this.message}</p>
            </div>
            <button onClick = {this.handleSearch}> Search! </button> 
        </div> 
    }
}