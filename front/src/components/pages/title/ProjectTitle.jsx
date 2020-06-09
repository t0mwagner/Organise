import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

/* GQL Queries */
const PROJECT = gql`
query project(
    $id: ID!
){
    project(
        id: $id
    ),
    {
        name
        color
    }
}
`

export const ProjectTitle = (props) => {

    const { id } = useParams()
    const { loading, error, data } = useQuery(PROJECT,{variables:{id:id}})

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    return (
        <h1>
        <i className="fas fa-square" style={{color:data.project.color, marginRight:'10px'}}></i>
        {
            data.project.name
        }
        </h1>
    )
}