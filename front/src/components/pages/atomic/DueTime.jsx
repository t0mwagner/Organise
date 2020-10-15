import React from 'react'
import moment from 'moment'

import "./DueTime.scss"

export const DueTime = (props) => {
 
    const now = new Date()
    const date = (props.doneDate)?new Date (props.doneDate):new Date(props.date)
    const result = moment(date).calendar()

    return (
        <span className='list__column due-time'>
            {
                (props.doneDate)
                ?<i className="fas fa-calendar-check due-time__date-icon"></i>
                :(date < now)
                ?<i className="fas fa-exclamation-circle due-time__date-icon"></i>
                :<i className="fas fa-clock due-time__date-icon"></i>
            }
            {
                <span className={
                    (props.doneDate)
                    ?'due-time__done-date--done-crossed'
                    :(date < now)
                    ?'due-time__done-date--late-task'
                    :''
                }>
                    {' ' + result}
                </span>
            }
        </span>
    )
}