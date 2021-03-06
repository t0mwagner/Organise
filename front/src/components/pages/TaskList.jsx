// React
import React, { useState } from 'react'
// Custom components
import { DueTime, ProjectName, Modal, TaskForm } from '../../components'
// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// Modal
import MicroModal from 'micromodal'
import moment from 'moment'

import "./List.scss"

/* GQL Queries */
const FEED_TASKS = gql`
{
    feedTasks,
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
const ADD_TASK = gql`
mutation addTask(
    $name:String!
    $description: String
    $project:ProjectInput!
    $dueDate:DateTime!
){
    postTask(
        name:$name
        description:$description
        project:$project
        done:false
        doneDate:null
        dueDate:$dueDate
    )
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
    $project:ProjectInput
    $done:Boolean
    $doneDate:DateTime
    $dueDate:DateTime
){
    updateTask(
        id:$id
        name:$name
        description:$description
        project:$project
        done:$done
        doneDate:$doneDate
        dueDate:$dueDate
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

export const TaskList = ({filter, numberHandler}) => {

    /* hooks */
    const { loading, error, data } = useQuery(FEED_TASKS)
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
                data: { feedTasks: [...cachedData.feedTasks, data.postTask] },
                })
            }
        })
    const [ deleteTask ] = useMutation(
        DELETE_TASK,
        {
            update(cache, { data } ) {
                const cachedData = cache.readQuery({ query: FEED_TASKS })
                const cachedDataUpdated = cachedData.feedTasks.filter(task=>task.id!==data.deleteTask.id)
                cache.writeQuery({
                query: FEED_TASKS,
                data: { feedTasks: cachedDataUpdated },
                })
            }
        })
    const [ selectedTask, setSelectedTask ] = useState({})
    const [ displayDone, setDisplayDone ] = useState()

    let filteredTasks = ""
 
    /* Handlers */
    const selectTask = (task) => {
        setSelectedTask(task)
    }
    /* Filter Handler */
    if (!loading && !error)
    {
        if (filter){
            filteredTasks = data.feedTasks.filter(task=>{
                let taskOk = true
                for (let [key, value] of Object.entries(filter)) {
                    if (key === 'dueDate'){
                        if (new Date(task.dueDate) > new Date(value)) taskOk = false
                    }
                    else if (task[key] !== value) taskOk = false
                }
                return taskOk
            })
        } else {
            filteredTasks = data.feedTasks
        }

        /* Update the number of items displayed */
        numberHandler(filteredTasks.filter(task=>{
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
            <button className="list__button list__button--add" onClick={()=>{
                MicroModal.show('modal-add-task',{
                    onShow: (modal) => {
                        document.getElementById('C-input_task_name').value = ''
                        document.getElementById('C-input_task_description').value = ''
                        document.getElementById('C-project_list').childNodes.forEach((li,index)=>{
                            if (index === 1){
                                li.classList.add('display')
                            } else {
                                li.classList.remove('display')
                                li.classList.remove('selected')
                            }
                        })
                        document.getElementById('C-input_task_date').defaultValue = moment().endOf('day').format('YYYY-MM-DD HH:mm')
                    }
                })
            }}>New task</button>
            <section>
                <div className='list__header'>
                    <span className='list__title'>Tasks</span>
                    <span className='list__button list__button--text-only' onClick={()=>setDisplayDone(!displayDone)}>{!displayDone?'Display ':'Hide '}done tasks</span>
                </div>
                <ul className='list__list'>
                {
                    filteredTasks.length === 0
                    ?
                        <p className='list__no-item'>No task here !</p>
                    :
                        filteredTasks
                        .sort((a,b) => (new Date(a.dueDate)<new Date(b.dueDate)?-1:1))
                        .map((task,index) => (
                            (!task.done || displayDone)
                            &&
                            <li key={index} id={task.id} className={task.done?'list__item list__item--alt':'list__item'} style={{gridTemplateColumns: '30px 1fr 180px 150px 30px 30px'}}>
                                {
                                    task.done
                                    ? <i className="fas fa-check-square list__icon" onClick={()=>uncheckTask({ variables: { id: task.id }})}></i>
                                    : <i className="far fa-square list__icon" onClick={()=>checkTask({ variables: { id: task.id, doneDate:new Date() }})}></i>
                                }
                                <span className='list__column'>{task.name}</span>
                                <DueTime date={task.dueDate} doneDate={task.doneDate} />
                                <ProjectName id={task.project.id} />
                                <i className="fas fa-edit list__icon" onClick={()=>{ 
                                    selectTask(task)
                                    MicroModal.show('modal-update-task',{
                                        onShow: (modal) => {
                                            document.getElementById('U-input_task_name').value = task.name
                                            document.getElementById('U-input_task_description').value = task.description
                                            document.getElementById('U-project_list').childNodes.forEach((li)=>{
                                                if (li.id === 'U-'+task.project.id){
                                                    li.classList.add('display')
                                                } else {
                                                    li.classList.remove('display')
                                                    li.classList.remove('selected')
                                                }
                                            })
                                            document.getElementById('U-input_task_date').value = moment(new Date(task.dueDate)).format('YYYY-MM-DD HH:mm')
                                        }
                                    }) 
                                }}></i>
                                <i className="fas fa-trash list__icon" onClick={()=>{
                                    selectTask(task)
                                    MicroModal.show('modal-delete-task')
                                }}></i>
                            </li>
                        ))
                }
                </ul>
            </section>
            <Modal title="New task" id="modal-add-task">
                <TaskForm action={{code:'C', name:"Create", query:addTask}}/>
            </Modal>
            <Modal title="Update task" id="modal-update-task" project=''>
                <TaskForm task={selectedTask} action={{code:'U', name:"Update", query:updateTask}}/>
            </Modal>
            <Modal title="Delete task" id="modal-delete-task">
                <TaskForm task={selectedTask} action={{code:'D', name:"Delete", query:deleteTask}}/>
            </Modal>
        </div>

    )
}