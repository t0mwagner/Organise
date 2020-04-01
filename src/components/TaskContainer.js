import React, { useState } from 'react'
import { AddForm } from './AddForm'
import { SideBar } from './SideBar'
import { TaskList } from './TaskList'
import { v4 as uuidv4 } from 'uuid';
import "./TaskContainer.css"

export const TaskContainer = () => {

    const [tasks, setTasks] = useState([])

    const addTask = (e) => {
        e.preventDefault()
        setTasks([...tasks,
            {
                id:uuidv4(),
                status:'opened',
                label:document.getElementById('input_task').value
            }
        ])
        document.getElementById('input_task').value = "";
    }

    const checkTask = (e) => {
        setTasks(tasks.map(task => 
            (task.id === e.target.id)?{id:task.id,status:'closed',label:task.label}:task
        ))   
    }

    const uncheckTask = (e) => {
        setTasks(tasks.map(task => 
            (task.id === e.target.id)?{id:task.id,status:'opened',label:task.label}:task
        ))   
    }

    return (
        <div className="content">
            <AddForm addTask={addTask} />
            <div id="content_main">
                <SideBar />
                <TaskList taskList={tasks} checkTask={checkTask} uncheckTask={uncheckTask}/>
            </div>
        </div>
    )
}