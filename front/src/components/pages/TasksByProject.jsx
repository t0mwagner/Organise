// React
import React, { useState } from 'react'
import { useParams } from "react-router-dom"
// Custom components
import { DueTime, ProjectName, Modal, TaskForm } from '../../components'
// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// Modal
import MicroModal from 'micromodal'
import moment from 'moment'

import "./List.scss"
import "./TaskList.scss"

/* GQL Queries */
const FEED_TASKS = gql`
query feedTasksByProject(
    $categoryId: ID!
){
    feedTasksByProject(
        categoryId: $categoryId
    ),
    {
        id
        name
        description
        categoryId
        done
        doneDate
        dueDate
    }
}
`
const ADD_TASK = gql`
mutation addTask(
    $name:String!
    $description: String
    $categoryId:ID!
    $dueDate:DateTime!
){
    postTask(
        name:$name
        description:$description
        categoryId:$categoryId
        done:false
        doneDate:null
        dueDate:$dueDate
    )
    {
        id
        name
        description
        categoryId
        done
        doneDate
        dueDate
    }
  }
`
const CHECK_TASK = gql`
mutation checkTask(
    $id:ID!
    $doneDate:DateTime!
){
    updateTask(
        id:$id
        done:true
        doneDate:$doneDate
    ),
    {
        id
        done
        doneDate
    }
}
`
const UNCHECK_TASK = gql`
mutation uncheckTask(
    $id:ID!
){
    updateTask(
        id:$id
        done:false
        doneDate:null
    ),
    {
        id
        done
        doneDate
    }
}
`
const UPDATE_TASK = gql`
mutation updateTask(
    $id:ID!
    $name:String
    $description: String
    $categoryId:ID
    $done:Boolean
    $doneDate:DateTime
    $dueDate:DateTime
){
    updateTask(
        id:$id
        name:$name
        description:$description
        categoryId:$categoryId
        done:$done
        doneDate:$doneDate
        dueDate:$dueDate
    ),
    {
        id
        name
        description
        categoryId
        done
        doneDate
        dueDate
    }
  }
`
const DELETE_TASK = gql`
mutation deleteTask(
    $id:ID!
){
    deleteTask(
        id:$id
    )
    {
      id
    }
  }
`

export const TasksByProject = ({numberHandler}) => {

    /* hooks */
    const { id } = useParams()
    const { loading, error, data } = useQuery(FEED_TASKS,{variables:{categoryId:id}})
    const [ checkTask ] = useMutation(CHECK_TASK)
    const [ uncheckTask ] = useMutation(UNCHECK_TASK)
    const [ updateTask ] = useMutation(UPDATE_TASK)
    const [ addTask ] = useMutation(
        ADD_TASK,
        {
            update(cache, { data } ) {
                const cachedData = cache.readQuery({ query: FEED_TASKS })
                cache.writeQuery({
                query: FEED_TASKS,
                data: { feedTasks: [...cachedData.feedTasksByProject, data.postTask] },
                })
            }
        })
    const [ deleteTask ] = useMutation(
        DELETE_TASK,
        {
            update(cache, { data } ) {
                const cachedData = cache.readQuery({ query: FEED_TASKS })
                const cachedDataUpdated = cachedData.feedTasksByProject.filter(task=>task.id!==data.deleteTask.id)
                cache.writeQuery({
                query: FEED_TASKS,
                data: { feedTasksByProject: cachedDataUpdated },
                })
            }
        })
    const [ selectedTask, setSelectedTask ] = useState({})
    const [ displayDone, setDisplayDone ] = useState()
 
    /* Change task select handler */
    const selectTask = (task) => {
        setSelectedTask(task)
    }
    /* Number Handler */
    if (!loading && !error)
    {
        /* Update the number of items displayed */
        numberHandler(data.feedTasksByProject.filter(task=>{
            if (task.hasOwnProperty('done'))
            {
                if (task.done){
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        }).length)
    }

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    return (
        <div className="list">
            <button className="add_btn" onClick={()=>{
                MicroModal.show('modal-add-task',{
                    onShow: (modal) => {
                        document.getElementById('C-input_task_name').value = ''
                        document.getElementById('C-input_task_description').value = ''
                        document.getElementById('C-input_task_date').defaultValue = moment().format('dddd Do MMMM YYYY HH:mm')
                    }
                })
            }}>Nouvelle tâche</button>
            <section>
                <div className='list_header'>
                    <span className='list_title'>Tâches</span>
                    <span className='list_button' onClick={()=>setDisplayDone(!displayDone)}>{!displayDone?'Afficher ':'Masquer '}les tâches terminées</span>
                </div>
                <ul>
                {
                    data.feedTasksByProject.length === 0
                    ?
                        <p className='no_item'>Aucune tâche !</p>
                    :
                        data.feedTasksByProject
                        .sort((a,b) => (new Date(a.dueDate)<new Date(b.dueDate)?-1:1))
                        .map((task,index) => (
                            (!task.done || displayDone)
                            &&
                            <li key={index} id={task.id} className={task.done?'alt_li':''} style={{gridTemplateColumns: '30px 1fr 180px 150px 30px 30px'}}>
                                {
                                    task.done
                                    ? <i className="fas fa-check-square click_icon" onClick={()=>uncheckTask({ variables: { id: task.id }})}></i>
                                    : <i className="far fa-square click_icon" onClick={()=>checkTask({ variables: { id: task.id, doneDate:new Date() }})}></i>
                                }
                                <span className='column'>{task.name}</span>
                                <DueTime date={task.dueDate} doneDate={task.doneDate} />
                                <ProjectName id={task.categoryId} />
                                <i className="fas fa-edit edit_btn" onClick={()=>{ 
                                    selectTask(task)
                                    MicroModal.show('modal-update-task',{
                                        onShow: (modal) => {
                                            document.getElementById('U-input_task_name').value = task.name
                                            document.getElementById('U-input_task_description').value = task.description
                                            document.getElementById('U-select_project').value = task.categoryId
                                            document.getElementById('U-input_task_date').value = moment(task.dueDate).format('dddd Do MMMM YYYY HH:mm')
                                        }
                                    }) 
                                }}></i>
                                <i className="fas fa-trash delete_btn" onClick={()=>{
                                    selectTask(task)
                                    MicroModal.show('modal-delete-task')
                                }}></i>
                            </li>
                        ))
                }
                </ul>
            </section>
            <Modal title="Créer une tâche" id="modal-add-task">
                <TaskForm action={{code:'C', name:"Créer", query:addTask}}/>
            </Modal>
            <Modal title="Mettre à jour une tâche" id="modal-update-task">
                <TaskForm task={selectedTask} action={{code:'U', name:"Mettre à jour", query:updateTask}}/>
            </Modal>
            <Modal title="Supprimer une tâche" id="modal-delete-task">
                <TaskForm task={selectedTask} action={{code:'D', name:"Supprimer", query:deleteTask}}/>
            </Modal>
        </div>

    )
}