// React
import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
// Custom components
import { ProjectColor, Modal, ProjectForm, TaskNumber } from '../../components'
// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// Modal
import MicroModal from 'micromodal'

import "./List.scss"
import "./ProjectList.scss"

/* GQL Queries */
const FEED_PROJECTS = gql`
{
    feedProjects,
    {
        id
        name
        color
        default
        tasks{
            id
        }
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
        default:false
    )
    {
        id
        name
        color
        default
        tasks{
            id
        }
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
const CHANGE_PROJECT_TASK = gql`
mutation changeProjectTask(
    $id:ID!
    $project:ProjectInput
){
    updateTask(
        id:$id
        project:$project
    ),
    {
        id
        project{
            id
        }
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
    const [ changeProjectTask ] = useMutation(CHANGE_PROJECT_TASK)
    const [ deleteProject ] = useMutation(
        DELETE_PROJECT,
        {
            update(cache, { data } ) {
                const cachedData = cache.readQuery({ query: FEED_PROJECTS })
                const cachedDataUpdated = cachedData.feedProjects.filter(project=>project.id!==data.deleteProject.id)
                cache.writeQuery({
                query: FEED_PROJECTS,
                data: { feedProjects: cachedDataUpdated },
                })
            }
        })
    const [ selectedProject, setSelectedProject ] = useState({})

    /* Handlers */
    const selectProject = (project) => {
        setSelectedProject(project)
    }
    const deleteProjectWithReassign = (project) => {
        // get default project id
        const defaultProjectId = data.feedProjects.filter(project=>project.default)[0].id
        // Change each task's project
        project.tasks.forEach(task => {
            changeProjectTask({variables:{id:task.id,project:{id:defaultProjectId}}})
        })
        deleteProject({variables:{id:project.id}})
    }
    if (!loading && !error)
    {
        /* Update the number of items displayed */
        numberHandler(data.feedProjects.length)
    }

    /* On loading or error */
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
                                <TaskNumber id={project.id} display='column' />
                                <i className="fas fa-edit edit_btn" onClick={()=>{ 
                                    selectProject(project)
                                    MicroModal.show('modal-update-project',{
                                        onShow: (modal) => {
                                            document.getElementById('U-input_project_name').value = project.name
                                        }
                                    }) 
                                }}></i>
                                <i className={(project.default)?'fas fa-trash delete_btn_disabled':'fas fa-trash delete_btn'} onClick={()=>{
                                    if (!project.default){
                                        selectProject(project)
                                        MicroModal.show('modal-delete-project')
                                    }
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
                <ProjectForm project={selectedProject} action={{code:'D', name:"Supprimer", query:deleteProjectWithReassign}} />
            </Modal>
        </div>

    )
}