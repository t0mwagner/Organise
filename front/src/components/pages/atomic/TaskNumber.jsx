import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

/* GQL Queries */
const FEED_TASKS = gql`
{
    feedTasks,
    {
        id
        project
        {
            id
        }
    }
}
`
export const TaskNumber = ({id, display}) => {

    const { loading, error, data } = useQuery(FEED_TASKS)
    let taskNumber

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    taskNumber = data.feedTasks.filter(task=>(id===task.project.id && !task.done)).length

    if (display === 'column')
    {
        return (
            <span className='column'>
                {taskNumber} tâche{(taskNumber>1)?'s':''} active{(taskNumber>1)?'s':''}
            </span>           
        )
    }
    return (taskNumber>1)?`${taskNumber} tasks`:`${taskNumber} task`    
    
}