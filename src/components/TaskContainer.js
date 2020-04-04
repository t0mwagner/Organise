import React, { useState } from 'react'
import { Title } from './Title'
import { Links } from './Links'
import { AddForm } from './AddForm'
import { TaskList } from './TaskList'
import { v4 as uuidv4 } from 'uuid';
import "./TaskContainer.css"

export const TaskContainer = () => {

    const [tasks, setTasks] = useState([])
    const [page, setPage] = useState({})
    const [filter, setFilter] = useState([])
    const [number, setNumber] = useState(0)

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

    const handlePage = (page) => {
        setPage(page)
    }

    const handleNumber = (number) => {
        setNumber(number)
    }
    const handleFilter = (filter) => {
        setFilter(filter)
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(task=>task.id !== id))
    }

    return (
        <div id="content">
            <div id="content_header">
                <Title title={page.title} taskNumber={number}/>
                <Links changePage={handlePage} changeFilter={handleFilter}/>
            </div>
            <div id="content_main">
                <AddForm addTask={addTask}/>
                <TaskList filter={filter} taskList={tasks} changeNumber={handleNumber} checkTask={checkTask} uncheckTask={uncheckTask} deleteTask={deleteTask} />
            </div>
        </div>
    )
}