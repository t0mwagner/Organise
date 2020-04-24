import React from 'react'

export const TaskNumber = (props) => {
    const filtered = props.tasks.filter(task=>(props.id===task.categoryId && !task.done))
    return (
        <span className='column'>
            {filtered.length} tâche{(filtered.length>1)?'s':''} active{(filtered.length>1)?'s':''}
        </span>
    ) 
}