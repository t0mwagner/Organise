import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

/* GQL Queries */
const FEED_PROJECTS = gql`
{
    feedProjects,
    {
        id
        name
        color
    }
}
`

export const ProjectName = (props) => {

    const { loading, error, data } = useQuery(FEED_PROJECTS)

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    const project = data.feedProjects.find(project=>props.id===project.id)
    return (
        <span className='column'>
                <i className="fas fa-square" style={{color:project.color, marginRight:'5px'}}></i> {project.name}
        </span>
    ) 

}