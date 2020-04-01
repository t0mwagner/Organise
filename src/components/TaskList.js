import React from 'react'
import "./TaskList.css"
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa'

export const TaskList = (props) => {

    return (
        <div id="task_list">            
           <section className="openedTasks">
                <h2>Opened tasks</h2>
                {
                    props.taskList.filter(task => task.status === 'opened').length === 0
                    && <p>You have no opened tasks.</p>
                }
                <ul>
                {
                    props.taskList.map((task,index) => {
                        if (task.status === 'opened'){                     
                            return (
                                <li key={index}>
                                    <span className="checkbox"><FaRegSquare id={task.id} onClick={props.checkTask}/></span>
                                    <span> {task.label}</span>
                                </li>
                            )
                        } else {
                            return ""
                        }
                    })
                }
                </ul>
            </section>
            <section className="closedTasks">
                <h2>Closed tasks</h2>
                {
                    props.taskList.filter(task => task.status === 'closed').length === 0
                    && <p>You have no closed tasks.</p>
                }
                <ul>
                {
                    props.taskList.map((task,index) => {
                        if (task.status === 'closed'){                     
                            return (
                                <li key={index}>
                                    <span className="checkbox"><FaCheckSquare id={task.id} onClick={props.uncheckTask}/></span>
                                    <span> {task.label}</span>
                                </li>
                            )
                        } else {
                            return ""
                        }
                    })
                }
                </ul>
            </section>
        </div>
    )
}