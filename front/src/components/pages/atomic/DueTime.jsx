import React from 'react'
import moment from 'moment'

import "./DueTime.scss"

export const DueTime = (props) => {
 
    const now = new Date()
    const date = (props.doneDate)?new Date (props.doneDate):new Date(props.date)
    const result = moment(date).calendar()

    return (
        <span className='column due_time'>
            {
                (props.doneDate)
                ?<i className="fas fa-calendar-check date_icon"></i>
                :(date < now)
                ?<i className="fas fa-exclamation-circle date_icon"></i>
                :<i className="fas fa-clock date_icon"></i>
            }
            {
                <span className={
                    (props.doneDate)
                    ?'done_crossed'
                    :(date < now)
                    ?'late_task'
                    :''
                }>
                    {' ' + result}
                </span>
            }
        </span>
    )
}