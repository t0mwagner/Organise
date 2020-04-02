import React from 'react'
import "./TaskList.css"
import { TimeLeft } from './TimeLeft'
import { FaRegSquare, FaCheck } from 'react-icons/fa'

export const TaskList = (props) => {

    return (
        <div id="task_list">
            {
                props.status.map((status, index) => (
                    <section key={index}>
                        <h2>{status.charAt(0).toUpperCase() + status.slice(1)} tasks</h2>
                        {
                            props.taskList.filter(task => task.status === status).length === 0
                            && <p className='noTasks'>You have no {status} tasks</p>
                        }
                        <ul>
                        {
                            props.taskList.map((task,index) => (
                                (task.status === status)                    
                                ?
                                    <li key={index}>
                                        {
                                            (status === 'opened')
                                            ?
                                                <FaRegSquare id={task.id} onClick={props.checkTask} className="checkbox"/>
                                            :
                                                <FaCheck id={task.id} onClick={props.uncheckTask} className="checkbox"/>
                                        }
                                        <span className={(status==='closed')?'crossed':''}>{task.label}</span>
                                        {
                                            (status === 'opened')&&<TimeLeft date={task.date} />
                                        }
                                    </li>
                                :null
                            ))
                        }
                        </ul>
                    </section>
                ))
            }
        </div>
    )
}