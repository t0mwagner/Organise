import React, { useState } from 'react'
import { FormModal, Category, DueTime } from '../../components'
import { useTaskApi } from '../../hooks/useTaskApi'
import api from '../../api'

import "./List.scss"
import "./TaskList.scss"

export const TaskList = ({filter, numberHandler}) => {

    /* Local states hooks */
    const [tasks, reload] = useTaskApi()
    const [displayDone, setDisplayDone] = useState()
    let filteredTasks = ""

    /* Tasks operations */
    const insertTask = async () => {
        let update = {
            done:false,
            doneDate:null,
            date:new Date(document.getElementById('select_task_date').value),
            label:document.getElementById('input_task_name').value,
            description:document.getElementById('input_task_description').value,
            categoryId:document.getElementById('select_category').value
        }
        await api.insertTask(update).then(res => {
            update._id = res.data.id
            const updated = tasks.data
            updated.push(update)
            reload(updated)
        })
    }
    const updateTask = async (id, update) => {
        const payload = update !== undefined
                ? update
                : {
                    date: new Date(document.getElementById('select_task_date').value),
                    label: document.getElementById('input_task_name').value,
                    description: document.getElementById('input_task_description').value,
                    categoryId: document.getElementById('select_category').value
                }
        await api.updateTaskById(id,payload)
        .then(res => {
            const tasksEdited = tasks.data.map((task)=>{
                if (task._id === id)
                {
                    for (const taskProp  in task)
                    {
                        if (payload.hasOwnProperty(taskProp)){
                            task[taskProp] = payload[taskProp]
                        }
                    }
                }
                return task
            })
            reload(tasksEdited)
        })
    }
    const deleteTask = async (id) => {
        await api.deleteTaskById(id).then(res => {
            reload(tasks.data.filter(task=>task._id !== id))
        })
    }  
 
    /* Filter Handler */
    if (!tasks.isLoading)
    {
        if (filter){
            filteredTasks = tasks.data.filter(task=>{
                let taskOk = true
                for (let [key, value] of Object.entries(filter)) {
                    if (key === 'date'){
                        if (new Date(task.date) > new Date(value)) taskOk = false
                    }
                    else if (task[key] !== value) taskOk = false
                }
                return taskOk
            })
        } else {
            filteredTasks = tasks.data
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

    return (
        <div className="list">
            {<FormModal
                mode='ajouter'
                label='tâche'
                insertHandler={insertTask}  
            />}
            <section>
                <div className='list_header'>
                    <span className='list_title'>Tâches</span>
                    <span className='list_button' onClick={()=>setDisplayDone(!displayDone)}>{!displayDone?'Afficher ':'Masquer '}les tâches terminées</span>
                </div>
                <ul>
                {
                    filteredTasks.length === 0
                    ?
                        <p className='no_item'>Aucune tâche !</p>
                    :
                        filteredTasks
                        .sort((a,b) => (new Date(a.date)<new Date(b.date)?-1:1))
                        .map((task,index) => (
                            (!task.done || displayDone)
                            &&
                            <li key={index} id={task._id} className={task.done?'alt_li':''} style={{gridTemplateColumns: '30px 1fr 130px 200px 30px 30px'}}>
                                {
                                    task.done
                                    ? <i className="fas fa-check-square click_icon" onClick={()=>updateTask(task._id,{done:false,doneDate:null})}></i>
                                    : <i className="far fa-square click_icon" onClick={()=>updateTask(task._id,{done:true,doneDate:new Date()})}></i>
                                }
                                <span className='column'>{task.label}</span>
                                <Category id={task.categoryId} />
                                <DueTime date={task.date} doneDate={task.doneDate} />
                                <FormModal 
                                    mode='modifier'
                                    label='tâche'
                                    item={task}
                                    updateHandler={updateTask}  
                                />
                                <FormModal
                                    mode='supprimer'
                                    label='tâche'
                                    item={task}
                                    deleteHandler={deleteTask}  
                                />
                            </li>
                        ))
                }
                </ul>
            </section> 
        </div>
    )
}