import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

/* GQL Queries */
const FEED_TASKS = gql`
{
    feedTasks,
    {
        id
        done
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
            <span className='list__column'>
                {taskNumber} active task{(taskNumber>1)?'s':''}
            </span>           
        )
    }
    return (taskNumber>1)?`${taskNumber} tasks`:`${taskNumber} task`    
    
}