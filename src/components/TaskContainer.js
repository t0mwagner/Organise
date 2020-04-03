import React, { useState } from 'react'
import { AddForm } from './AddForm'
import { SideBar } from './SideBar'
import { TaskList } from './TaskList'
import { v4 as uuidv4 } from 'uuid';
import "./TaskContainer.css"

export const TaskContainer = () => {

    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState({})

    const addTask = (e) => {
        e.preventDefault()
        setTasks([...tasks,
            {
                id:uuidv4(),
                status:'opened',
                date:document.getElementById('date_select').value,
                label:document.getElementById('input_task').value
            }
        ])
        document.getElementById('input_task').value = "";
    }

    const checkTask = (e) => {
        setTasks(tasks.map(task => {
            if (task.id === e.target.id){
                task.status='closed'
            }
            return task
        }))  
    }

    const uncheckTask = (e) => {
        setTasks(tasks.map(task => {
            if (task.id === e.target.id){
                task.status='opened' 
            }
            return task
        })) 
    }

    const changeFilter = (filter) => {
        setFilter(filter)
    }

    return (
        <div className="content">
            <AddForm addTask={addTask} />
            <div id="content_main">
                <SideBar changeFilter={changeFilter}/>
                <TaskList filter={filter} taskList={tasks} checkTask={checkTask} uncheckTask={uncheckTask}/>
            </div>
        </div>
    )
}