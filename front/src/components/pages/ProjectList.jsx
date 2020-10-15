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
const FEED_TASKS_BY_PROJECT = gql`
query feedTasksByProject(
    $project: ProjectInput!
){
    feedTasksByProject(
        project: $project
    ),
    {
        id
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
        name
        description
        project{
            id
        }
        done
        doneDate
        dueDate
    }
  }
`

export const ProjectList = ({ numberHandler }) => {

    /* hooks */
    const [ selectedProject, setSelectedProject ] = useState({})
    const { loading, error, data } = useQuery(FEED_PROJECTS)
    const { loadingTasks, errorTasks, dataTasks } = useQuery(FEED_TASKS_BY_PROJECT,{variables:{project:{id:selectedProject.id}}})
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

    /* Handlers */
    const selectProject = (project) => {
        setSelectedProject(project)
    }

    const deleteProjectWithReassign = (project) => {
        const defaultProjectId = data.feedProjects.filter(project=>project.default)[0].id
        if (dataTasks){
            dataTasks.feedTasksByProject.forEach(async (task) => {
                await changeProjectTask({variables:{id:task.id,project:{id:defaultProjectId}}})
            })
            deleteProject({variables:{id:project.id}})
        }
    }

    if (!loading && !error) numberHandler(data.feedProjects.length)

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    return (
        <div className="list">
            <button className="list__button list__button--add" onClick={()=>{
                MicroModal.show('modal-add-project',{
                    onShow: (modal) => {
                        document.getElementById('C-input_project_name').value = ''
                    }
                })
            }}>New Project</button>
            <section>
                <div className='list__header'>
                    <span className='list__title'>Projects</span>
                </div>
                <ul className='list__list'>
                {
                    data.feedProjects
                    .sort((a,b) => (b.tasks.length<a.tasks.length)?-1:1)
                    .map((project,index) => (
                        <li className='list__item' key={index} id={project.id} style={{gridTemplateColumns: '30px 1fr 1fr 30px 30px'}}>
                            <ProjectColor color={project.color} />
                            <NavLink to={`/project/${project.id}`} className='list__column list__column--clickable'>{project.name}</NavLink>
                            <TaskNumber id={project.id} display='column' />
                            <i className="fas fa-edit list__icon" onClick={()=>{ 
                                selectProject(project)
                                MicroModal.show('modal-update-project',{
                                    onShow: (modal) => {
                                        document.getElementById('U-input_project_name').value = project.name
                                    }
                                }) 
                            }}></i>
                            <i className={(project.default)?'fas fa-trash list__icon list__icon--disabled':'fas fa-trash list__icon'} onClick={()=>{
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
            <Modal title="New project" id="modal-add-project">
                <ProjectForm action={{code:'C', name:"Create", query:addProject}}/>
            </Modal>
            <Modal title="Update project" id="modal-update-project">
                <ProjectForm project={selectedProject} action={{code:'U', name:"Update", query:updateProject}}/>
            </Modal>
            <Modal title="Delete project" id="modal-delete-project">
                <ProjectForm project={selectedProject} action={{code:'D', name:"Delete", query:deleteProjectWithReassign}} />
            </Modal>
        </div>

    )
}