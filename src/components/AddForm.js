import React from 'react'
import "./AddForm.css"

export const AddForm = (props) => {

    const now = new Date()
    const today = new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    const tomorrow = new Date(today)
    const nextWeek = new Date(today)
    const nextMonth = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const dates = [
        {
            label:'today',
            value: today
        },
        {
            label:'by tomorrow',
            value: tomorrow
        },
        {
            label:'within a week',
            value: nextWeek
        },
        {
            label:'within a month',
            value: nextMonth
        },
        {
            label:'... pick a date',
            value: 'choose'
        }
    ]
    return (
        <div className="add_form">
            <form action=''>
                <input type="text" id="input_task" placeholder="Do the laundry..." />
                <select id="date_select" defaultValue={dates[0].value}>
                {
                    dates.map((date,index) => (
                        <option key={index} value={date.value}>
                        {date.label}
                        </option>
                    ))
                }
                </select>
                <button type="submit" onClick={props.addTask}>Add task</button>
            </form>
        </div>
    )
}