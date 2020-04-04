import React, { useState } from 'react'
import "./TaskList.css"
import { TimeLeft } from './TimeLeft'
import { FaRegSquare, FaCheck, FaTrashAlt } from 'react-icons/fa'

export const TaskList = (props) => {

    const [done, setDone] = useState(false)

    const handleDone = () => {
        setDone(!done)
    }

    const filteredTasks = props.taskList.filter(task=>{
        const dateTask = new Date(task.date)
        let taskOk = true
        for (let [key, value] of Object.entries(props.filter)) {
            if (key === 'date'){
                const dateKey = new Date(value)
                if (dateTask > dateKey){
                    taskOk = false
                }
            } 
            else if (task[key] !== value) {
                taskOk = false
            }
            
        }
        return taskOk
    })
    props.changeNumber(filteredTasks.length)

    return (
        <div id="task_list">
            <section>
                <div className='list_header'>
                    <span className='list_title'>Tasks</span>
                    <span className='list_button' onClick={handleDone}>
                    {
                        (done)
                        ?
                            'hide done tasks'
                        :
                            'display done tasks'
                    }    
                    </span>
                </div>
                <ul>
                {
                    filteredTasks
                    .sort((a,b)=>{
                        const datea = new Date(a.date)
                        const dateb = new Date(b.date)
                        return (datea<dateb)?-1:1
                    })
                    .map((task,index) => {
                        return (
                            (task.status === 'opened' || (task.status === 'closed' && done === true))
                            ?
                                <li key={index}>
                                    {
                                        (task.status === 'opened')
                                        ?
                                            <FaRegSquare id={task.id} onClick={props.checkTask} className="checkbox"/>
                                        :
                                            ((task.status === 'closed') && (done === true))
                                            ?
                                                <FaCheck id={task.id} onClick={props.uncheckTask} className="checkbox"/>
                                            :
                                                ''
                                    }
                                    <span className={task.status==='closed'?'crossed':''}>{task.label}</span>
                                    <TimeLeft date={task.date} />
                                    <FaTrashAlt className="delete_icon" onClick={()=>props.deleteTask(task.id)} />
                                </li>
                            :
                                ''
                        )})
                }
                </ul>
            </section> 
        </div>
    )
}