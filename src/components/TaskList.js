import React, { useState } from 'react'
import { TimeLeft } from './TimeLeft'
import { TaskForm } from './TaskForm'
import { FaRegSquare, FaCheck, FaTrashAlt } from 'react-icons/fa'

import "./TaskList.css"

export const TaskList = (props) => {

    const [displayDone, setDisplayDone] = useState(false)
    
    const handleDisplayDone = () => {
        setDisplayDone(!displayDone)
    }

    const filteredTasks = props.taskList.filter(task=>{
        let taskOk = true
        for (let [key, value] of Object.entries(props.filter)) {
            if (key === 'date'){
                if (new Date(task.date) > new Date(value)) taskOk = false
            }
            else if (task[key] !== value) taskOk = false
        }
        return taskOk
    })
    
    props.changeNumber(filteredTasks.filter(task => !task.done).length)

    return (
        <div id="task_list">
            <TaskForm 
                mode='add'
                addTask={props.addTask}  
            />
            <section>
                <div className='list_header'>
                    <span className='list_title'>Tasks</span>
                    <span className='list_button' onClick={handleDisplayDone}>
                    {
                        (displayDone)
                        ?'hide done tasks'
                        :'display done tasks'
                    }    
                    </span>
                </div>
                <ul>
                {
                    filteredTasks
                    .sort((a,b)=>(new Date(a.date)<new Date(b.date))?-1:1)
                    .map((task,index) => (
                        (!task.done || (task.done && displayDone === true))
                        ?
                            <li key={index}>
                                {
                                    (!task.done)
                                    ?
                                        <FaRegSquare id={task.id} onClick={props.checkTask} className="checkbox"/>
                                    :
                                        <FaCheck id={task.id} onClick={props.uncheckTask} className="checkbox"/>
                                }
                                <span className={task.done?'crossed':''}>{task.label}</span>
                                {
                                    (!task.done)
                                    ?
                                        <TimeLeft date={task.date} />
                                    :
                                        <span className="done">done</span>
                                }
                                <TaskForm 
                                    mode='edit'
                                    task={task}
                                    editTask={props.editTask} 
                                />
                                <FaTrashAlt className='delete_icon' onClick={()=>props.deleteTask(task.id)} />
                            </li>
                        :
                            ''
                    ))
                }
                </ul>
            </section> 
        </div>
    )
}