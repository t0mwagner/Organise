import React from 'react'
import "./TimeLeft.css"

export const TimeLeft = (props) => {
 
    const now = new Date()
    const date = new Date(props.date)
    const diff = (date.getTime() - now.getTime()) / (1000*60*60*24)
    const diffRound = Math.round(diff)
    let message

    if (diffRound > 30)
    {
        message = 'more than a month'
    } else {
        switch (diffRound) {
            case 0:
                message = 'less than a day'
                break
            case 1:
                message = '1 day'
                break
            default:
                message = diffRound + ' days'
        }
    }  
    return (
        <span className='time_left'>
            {message} left
        </span>
    )
}