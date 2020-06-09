// React
import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
// Custom components
import { ProjectColor, Modal, ProjectForm } from '../../components'
// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// Modal
import MicroModal from 'micromodal'

import "./List.scss"
import "./ProjectList.scss"
import { TaskNumber } from './columns/TaskNumber'

/* GQL Queries */
const FEED_PROJECTS = gql`
{
    feedProjects,
    {
        id
        name
        description
        color
    }
}
`
const ADD_PROJECT = gql`
mutation addTask(
    $name:String!
    $color:String!
){
    postProject(
        name:$name
        color:$color
    )
    {
        id
        name
        color
    }
  }
`
const UPDATE_PROJECT = gql`
mutation updateProject(
    $id:ID!
    $name:String
    $color:String
){
    updateProject(
        id:$id
        name:$name
        color:$color
    ),
    {
        id
        name
        color
    }
  }
`
const DELETE_PROJECT = gql`
mutation deleteProject(
    $id:ID!
){
    deleteProject(
        id:$id
    )
    {
      id
    }
  }
`

export const ProjectList = ({ numberHandler }) => {

    /* hooks */
    const { loading, error, data } = useQuery(FEED_PROJECTS)
    const [ updateProject ] = useMutation(UPDATE_PROJECT)
    const [ addProject ] = useMutation(
        ADD_PROJECT,
        {
            update(cache, { data } ) {
                const cachedData = cache.readQuery({ query: FEED_PROJECTS })
                cache.writeQuery({
                query: FEED_PROJECTS,
                data: { feedProjects: [...cachedData.feedProjects, data.postProject] },
                })
            }
        })
    const [ deleteProject ] = useMutation(
        DELETE_PROJECT,
        {
            update(cache, { data } ) {
                const cachedData = cache.readQuery({ query: FEED_PROJECTS })
                const cachedDataUpdated = cachedData.feedProjects.filter(project=>project.id!==data.deleteProject.id)
                cache.writeQuery({
                query: FEED_PROJECTS,
                data: { feedTasks: cachedDataUpdated },
                })
            }
        })
    const [ selectedProject, setSelectedProject ] = useState({})

    /* Change task select handler */
    const selectProject = (project) => {
        setSelectedProject(project)
    }

    if (!loading && !error)
    {
        /* Update the number of items displayed */
        numberHandler(data.feedProjects.length)
    }

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    return (
        <div className="list">
            <button className="add_btn" onClick={()=>{
                MicroModal.show('modal-add-project',{
                    onShow: (modal) => {
                        document.getElementById('C-input_project_name').value = ''
                    }
                })
            }}>Nouveau projet</button>
            <section>
                <div className='list_header'>
                    <span className='list_title'>Projets</span>
                </div>
                <ul>
                {
                    data.feedProjects.length === 0
                    ?
                        <p className='no_item'>Aucun projet !</p>
                    :
                        data.feedProjects
                        .sort((a,b) => (a.name<b.name)?-1:1)
                        .map((project,index) => (
                            <li key={index} id={project.id} style={{gridTemplateColumns: '30px 1fr 1fr 30px 30px'}}>
                                <ProjectColor color={project.color} />
                                <NavLink to={`/project/${project.id}`} className='column project_name'>{project.name}</NavLink>
                                <TaskNumber id={project.id} />
                                <i className="fas fa-edit edit_btn" onClick={()=>{ 
                                    selectProject(project)
                                    MicroModal.show('modal-update-project',{
                                        onShow: (modal) => {
                                            document.getElementById('U-input_project_name').value = project.name
                                        }
                                    }) 
                                }}></i>
                                <i className="fas fa-trash delete_btn" onClick={()=>{
                                    selectProject(project)
                                    MicroModal.show('modal-delete-project')
                                }}></i>
                            </li>
                        ))
                }
                </ul>
            </section>
            <Modal title="Créer un projet" id="modal-add-project">
                <ProjectForm action={{code:'C', name:"Créer", query:addProject}}/>
            </Modal>
            <Modal title="Mettre à jour un projet" id="modal-update-project">
                <ProjectForm project={selectedProject} action={{code:'U', name:"Mettre à jour", query:updateProject}}/>
            </Modal>
            <Modal title="Supprimer un projet" id="modal-delete-project">
                <ProjectForm project={selectedProject} action={{code:'D', name:"Supprimer", query:deleteProject}}/>
            </Modal>
        </div>

    )
}