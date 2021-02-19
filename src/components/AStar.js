import { Board, boardstates } from './Board'
import { State } from './State'
import { PriorityQueue } from './PriorityQueue'
import { BoardView } from '../views/BoardView'
import { DrawBar } from './DrawButtonBar'
import React from 'react'

const SPEED_MS = 100 
export class AStar extends React.Component{
    constructor(props) {
        super(props);


        this.state = {
            board: new Board(new Array(10*10).fill(boardstates.unvisited)),
            block: "wall",
            drawStatus: false,
        }

        this.visitedStates = []; 
        this.priorityQ = new PriorityQueue();
        this.message = "Hello World";

        this.search = this.search.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.changeStart = this.changeStart.bind(this)
        this.changeEnd = this.changeEnd.bind(this)
        this.changeBlock = this.changeBlock.bind(this)
        this.erase = this.erase.bind(this)
        this.addWall = this.addWall.bind(this)

        this.setDrawStatusFalse = this.setDrawStatusFalse.bind(this)
        this.setDrawStatusTrue = this.setDrawStatusTrue.bind(this)
        this.draw = this.draw.bind(this)

        this.functions = {
            "wall": this.addWall,
            "start": this.changeStart,
            "end": this.changeEnd,
            "erase":this.erase,
        }
    }
    setDrawStatusTrue(){
        this.setState({
            drawStatus: true
        })
    }
    setDrawStatusFalse(){
        this.setState({
            drawStatus: false
        })
    }
    draw(args){
        const func = this.functions[this.state.block]
        if(this.state.drawStatus)
            func(args)
    }

    distance(state){
        return state.euclideanDistanceTo(this.state.board.end);
    }
    search(){
        const item = {state: this.state.board.start, path: [],cost: 0}
        this.priorityQ.enqueue(0,item); 
        while(!this.priorityQ.isEmpty){
            const priorityQueueItem = this.priorityQ.dequeue().item;
            const currentState = priorityQueueItem.state;
            const currentPath = priorityQueueItem.path;
            if(!this.visited(currentState))
            this.visitedStates.push(currentState);
            
            if(currentState.equal(this.state.board.end))
                return([...currentPath])
                
            const newPath = [...currentPath, currentState]

            let children = this.state.board.getChildren(currentState); 
            for(let i = 0; i < children.length; i++){
                let child = children[i];
                if(this.visited(child))
                    continue; 

                const newItem = {state: child, path:newPath, cost:priorityQueueItem.cost + 1};
                let priority = this.distance(child); 
                priority = priority + priorityQueueItem.cost 
                this.priorityQ.enqueue(priority, newItem)
            }
            console.log(this.priorityQ)
        }
        return null
    }
    show(){
        const board = this.state.board.board
        for(let i = 0; i < this.visitedStates.length; i++)
        {
            const state = this.visitedStates[i]
            const [x,y] = state.position
            const pos = x * this.state.board.len + y
            setTimeout(()=>{
                if(board[pos] === boardstates.unvisited)
                board[pos] = boardstates.visited
                this.setState({})
            },SPEED_MS * i)
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

        this.show()
        setTimeout(()=>{
            if(!path)return
            this.state.board.setPath(path)
            this.setState({})
        },this.visitedStates.length * SPEED_MS)
    }
    changeStart([row,col]){
        this.state.board.setStart(new State([row,col]))
        this.setState({})
    }
    changeEnd([row,col]){
        this.state.board.setEnd(new State([row,col]))
        this.setState({})
    }
    addWall([row,col]){
        this.state.board.setWall(new State([row,col]))
        this.setState({})
    }
    erase([row,col]){
        this.state.board.setUnvisited(new State([row,col]))
        this.setState({})
    }
    changeBlock(value){
        this.setState({block:value})
    }
    render(){
        const buttons = {
            "Move Start":()=>this.changeBlock("start"),
            "Move Goal":()=>this.changeBlock("end"),
            "Draw Wall" :()=>this.changeBlock("wall"),
            "Erase":()=>this.changeBlock("erase"),
        }
        return(
            <div>
                <h1>A-star</h1>
                <BoardView board={this.state.board.board} onMouseDown={this.setDrawStatusTrue} 
                           onMouseUp={this.setDrawStatusFalse} onMouseOver={this.draw}
                           onClick={this.functions[this.state.block]}/>
                <DrawBar buttons={buttons}/>
                <div className="row">
                <button className="col-lg-12 btn btn-success" onClick={this.handleSearch}>Search!</button>
                </div>
            </div> 
        );
    }
}