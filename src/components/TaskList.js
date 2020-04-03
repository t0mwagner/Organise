import React from 'react'
import "./TaskList.css"
import { TimeLeft } from './TimeLeft'
import { FaRegSquare, FaCheck } from 'react-icons/fa'

export const TaskList = (props) => {

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
    return (
        <div id="task_list">
            <section>
                <h2>Tasks</h2>
                <ul>
                {
                    filteredTasks
                    .sort((a,b)=>{
                        const datea = new Date(a.date)
                        const dateb = new Date(b.date)
                        return (datea<dateb)?-1:1
                    })
                    .map((task,index) => {
                        if (task.status === 'opened')
                        {
                            return (
                                <li key={index}>
                                    <FaRegSquare id={task.id} onClick={props.checkTask} className="checkbox"/>      
                                    <span>{task.label}</span>
                                    <TimeLeft date={task.date} />
                                </li> 
                            )
                        }
                        return ''
                    })
                }
                </ul>
            </section>
            
            {
                (!props.filter.hasOwnProperty('status'))
                ?
                    <section>
                        <h2>Closed tasks</h2>
                        <ul>
                        {
                            filteredTasks
                            .sort((a,b)=>{
                                const datea = new Date(a.date)
                                const dateb = new Date(b.date)
                                return (datea<dateb)?-1:1
                            })
                            .map((task,index) => {
                                if (task.status === 'closed')
                                {
                                    return (
                                        <li key={index}>
                                            <FaCheck id={task.id} onClick={props.uncheckTask} className="checkbox"/>      
                                            <span className='crossed'>{task.label}</span>
                                        </li> 
                                    )
                                }
                                return ''
                            })
                        }
                        </ul>
                    </section>
                :
                    null
            }
        </div>
    )
}