import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';

import { FaCalendarCheck, FaClock, FaExclamationCircle } from 'react-icons/fa'
import "./DueTime.scss"

export const DueTime = (props) => {
 
    const now = new Date()
    const date = (props.doneDate)?new Date (props.doneDate):new Date(props.date)
    moment.locale('fr')
    const result = moment(date).calendar()

    return (
        <span className='column due_time'>
            {
                (props.doneDate)
                ?<FaCalendarCheck className='date_icon' />
                :(date < now)
                ?<FaExclamationCircle className='date_icon' />
                :<FaClock className='date_icon' />
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