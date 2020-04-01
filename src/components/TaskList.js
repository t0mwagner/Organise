import React from 'react'
import "./TaskList.css"

export const TaskList = (props) => {

    return (
        <div id="task_list">            
           <section className="openedTasks">
                <ul>
                    {
                        props.taskList.map((task) => {
                        return <li><span>box </span><span>{task}</span></li>
                        })
                    }
                </ul>
            </section>
        </div>
    )
}