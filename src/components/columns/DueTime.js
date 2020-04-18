import React from 'react'
import "./DueTime.css"

export const DueTime = (props) => {
 
    const now = new Date()
    const date = new Date(props.date)
    const diff = (date.getTime() - now.getTime()) / (1000*60*60*24)
    const diffRound = Math.round(diff)
    let result

    if (diffRound === 0){
        result = "Aujourd'hui " + date.toLocaleString([],{hour12:false,hour:'numeric',minute:'2-digit'})
    } else if (diffRound < 7){
        result = date.toLocaleString([],{weekday:"short",hour12:false,hour:'numeric',minute:'2-digit'})
    } else if (diffRound >= 7){
        result = date.toLocaleString([],{day:'numeric',month:'short'})
        if (now.getFullYear() !== date.getFullYear()){
            result = result + ' ' + date.getFullYear()
        } else {
            result = result + ' ' + date.toLocaleString([],{hour:'numeric',minute:'2-digit'})
        }
    }

    return (
        <span className='column'>
            {result}
        </span>
    )
}