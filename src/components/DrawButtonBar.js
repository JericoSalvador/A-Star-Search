import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const divStyle= {
    padding:5,
    margin:5,
}
export function DrawBar({buttons}){

    const [active, setActive] = useState("Draw Wall")
    
    const [buttonList, setButtonList] = useState([])
    
    useEffect( ()=>{
        const l = []
        for(const key in buttons){
            const disabled = key === active ? true : false
            l.push([key, buttons[key], disabled])
        }
        setButtonList(l)
    },[active])

    return <div style={divStyle}>
        {buttonList.map( ([buttonText,buttonFunction,disabled]) => <button 
                    style={divStyle}
                    className="btn btn-secondary" 
                    onClick={() => {setActive(buttonText);buttonFunction()}}
                    disabled={disabled}
                    >{buttonText}</button>) }
    </div>
}
