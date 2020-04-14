import React from 'react'

import "./TaskNumber.css"

export const TaskNumber = (props) => {
    const filtered = props.tasks.filter(task=>(props.id===task.categoryId && !task.done))
    return (
        <span className='column'>
            {filtered.length} active task{(filtered.length>1)?'s':''}
        </span>
    ) 
}