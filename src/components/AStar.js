import { Board, boardstates } from './Board'
import { State } from './State'
import { PriorityQueue } from './PriorityQueue'
import { BoardView } from '../views/BoardView'
import React from 'react'

export class AStar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(new Array(10*10).fill(boardstates.unvisited)),
        }
        console.log(this.state)

        for(let i = 1;i<this.state.board.len-1;i++)
        {
            this.state.board.setWall([i,5])
        }
        this.state.board.setStart(new State([9,4]))

        this.visitedStates = []; 
        this.priorityQ = new PriorityQueue();
        this.message = "Hello World";

        this.search = this.search.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.changeStart = this.changeStart.bind(this)
    }
    distance(state){
        return state.distanceTo(this.state.board.end);
    }
    search(){
        const item = {state: this.state.board.start, path: [],cost: 0}
        this.priorityQ.enqueue(0,item); 
        while(!this.priorityQ.isEmpty){
            const priorityQueueItem = this.priorityQ.dequeue().item;
            const currentState = priorityQueueItem.state;
            const currentPath = priorityQueueItem.path;
            // console.log(currentState);
            // console.log(currentPath);
            if(!this.visited(currentState))
            this.visitedStates.push(currentState);
            // this.state.board.setVisit(currentState);
            
            if(currentState.equal(this.state.board.end))
                return([...currentPath])
                
            const newPath = [...currentPath, currentState]

            let children = this.state.board.getChildren(currentState); 
            // console.log("children: ", children);
            for(let i = 0; i < children.length; i++){
                let child = children[i];
                if(this.visited(child))
                    continue; 
                if(this.inFringe(child))
                    continue;
                this.visitedStates.push(child)
                // console.log("child: ", child);
                const newItem = {state: child, path:newPath, cost:priorityQueueItem.cost };
                let priority = this.distance(child); 
                priority = priority + priorityQueueItem.cost 
                this.priorityQ.enqueue(priority, newItem)
            }
        }
        return null
    }
    show(){
        console.log(this.visitedStates)
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
    inFringe(state){
        for(let i = 0; i < this.priorityQ.items.length; i++)
        {
            let currentstate = this.priorityQ.items[i].item.state
            if (currentstate.equal(state))
                return true
        }
        return false
    }
    handleSearch(){
        this.state.board.reset()
        this.visitedStates = []
        this.priorityQ = new PriorityQueue()
        const path = this.search()
        // this.state.board.setPath(path)
        this.show()
        setTimeout(()=>{
            if(!path)return
            this.state.board.setPath(path)
            this.setState({})
        },this.visitedStates.length * 100)
    }
    changeStart([row,col]){
        console.log("inside changestart")
        this.state.board.setStart(new State([row,col]))
        this.setState({})
    }
    render(){
        return <div>
            <h1>A-star</h1>
            <BoardView board={this.state.board.board} />
            <button onClick = {this.handleSearch}> Search! </button> 
        </div> 
    }
}