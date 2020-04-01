import React, { useState } from 'react';
import { AddForm } from './AddForm'
import { SideBar } from './SideBar'
import { TaskList } from './TaskList'
import "./TaskContainer.css"

export const TaskContainer = () => {

    const [tasks, setTasks] = useState([])

    const addTask = (e) => {
        e.preventDefault()
        setTasks([...tasks,document.getElementById('input_task').value])
        document.getElementById('input_task').value = "";
    }

    return (
        <div className="content">
            <AddForm addTask={addTask} />
            <div id="content_main">
                <SideBar />
                <TaskList />
            </div>
        </div>
    )
}