import React from 'react'
import { useTaskApi } from '../../../hooks/useTaskApi'

export const TaskNumber = (props) => {

    const [tasks] = useTaskApi()

    const filtered = !tasks.isLoading?tasks.data.filter(task=>(props.id===task.categoryId && !task.done)):[]

    return (
        tasks.isLoading
        ? <span className='column'> Chargement ... </span>
        : <span className='column'>
            {filtered.length} tâche{(filtered.length>1)?'s':''} active{(filtered.length>1)?'s':''}
        </span>           
    ) 
    
}