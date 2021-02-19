import PropTypes from 'prop-types'
import { boardstates } from '../components/Board'

let range = n => [...Array(n).keys()]

const SIZE = 30
const styles = {

    blackBox:{
        width:SIZE, 
        height:SIZE,
        backgroundColor: 'black',
        border:"1px solid black",
    },
    greyBox:{
        width:SIZE, 
        height:SIZE,
        backgroundColor: 'lightgray',
        border:"1px solid black",
    },
    darkcyanBox:{
        width:SIZE, 
        height:SIZE,
        backgroundColor: 'darkcyan',
        border:"1px solid black",
    },
    whiteBox:{
        width:SIZE, 
        height:SIZE,
        backgroundColor: 'white',
        border:"1px solid black",
    },
    greenBox:{
        width:SIZE,
        height:SIZE, 
        backgroundColor:"green",
        border:"1px solid black",
    },
    blueBox:{
        width:SIZE,
        height:SIZE, 
        backgroundColor:"blue",
        border:"1px solid black",
    }
    
}
const BoxView = ({status, onMouseDown, onMouseUp, onMouseOver, onClick}) =>
{
    if (status === boardstates.unvisited){
        return <div style={styles.whiteBox} 
        onMouseDown={onMouseDown} 
        onMouseUp={onMouseUp} 
        onMouseOver={onMouseOver}
        onClick={onClick}></div>
    }
    else if(status === boardstates.visited){
        return <div style={styles.greyBox}
        onMouseDown={onMouseDown} 
        onMouseUp={onMouseUp} 
        onMouseOver={onMouseOver}
        onClick={onClick}></div>
    }
    else if(status === boardstates.start){
        return <div style={styles.greenBox}></div>
    }
    else if(status === boardstates.wall){
        return <div style = {styles.blackBox}
        onMouseDown={onMouseDown} 
        onMouseUp={onMouseUp} 
        onMouseOver={onMouseOver}
        onClick={onClick}></div>
    }
    else if(status === boardstates.end){
        return <div style={styles.blueBox}></div>
    }
    else if(status === boardstates.path){
        return <div style={styles.darkcyanBox}
        onMouseDown={onMouseDown} 
        onMouseUp={onMouseUp} 
        onMouseOver={onMouseOver}
        onClick={onClick}></div>
    }
}

export const BoardView = ({board, onMouseDown, onMouseUp, onMouseOver,onClick}) => {
    const len = Math.sqrt(board.length)
    return (
        <div style={{display:"flex", justifyContent:"center",alignItems:"center"}} 
        onMouseUp={onMouseUp} onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        >
            <div>
            {range(len).map((x)=><div style={{display:'flex'}}>
                {range(len).map((y) => <BoxView status = {board[x*len + y]} 
                onMouseOver={() => onMouseOver([x,y])}
                onMouseDown={() => onClick([x,y])}
                />)}
            </div>)}
            </div>
        </div>
    )
}

BoardView.propTypes = {
    board: PropTypes.array,
}