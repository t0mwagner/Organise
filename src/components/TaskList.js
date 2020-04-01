import React from 'react'
import "./TaskList.css"
import { FaRegSquare, FaRegCheckSquare } from 'react-icons/fa'

export const TaskList = (props) => {

    return (
        <div id="task_list">
            {
                props.status.map(status => (
                    <section>
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
                                        <span className="checkbox">
                                        {
                                            (status === 'opened')
                                            ?<FaRegSquare id={task.id} onClick={props.checkTask}/>
                                            :<FaRegCheckSquare id={task.id} onClick={props.uncheckTask}/>
                                        }
                                        </span>
                                        <span>{task.label}</span>
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