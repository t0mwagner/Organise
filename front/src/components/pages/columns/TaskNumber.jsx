import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

/* GQL Queries */
const FEED_TASKS = gql`
{
    feedTasks,
    {
        id
        projectId
    }
}
`
export const TaskNumber = ({id}) => {

    const { loading, error, data } = useQuery(FEED_TASKS)
    let taskNumber

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    taskNumber = data.feedTasks.filter(task=>(id===task.projectId && !task.done)).length

    return (
        <span className='column'>
            {taskNumber} tâche{(taskNumber>1)?'s':''} active{(taskNumber>1)?'s':''}
        </span>           
    ) 
    
}