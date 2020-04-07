import React, { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Title } from './components/Title'
import { Links } from './components/Links'
import { TaskList } from './components/TaskList'
import { v4 as uuidv4 } from 'uuid';

import "./App.css"

export const App = () => {

    const [tasks, setTasks] = useState([])
    const [page, setPage] = useState({title:'All tasks'})
    const [filter, setFilter] = useState([])
    const [number, setNumber] = useState(0)

    const addTask = () => {
        const date = new Date(document.getElementById('date_select').value)
        setTasks([...tasks,
            {
                id:uuidv4(),
                done:false,
                date:date,
                label:document.getElementById('input_task').value
            }
        ])
    }

    const editTask = (id) => {
        const tasksEdited = tasks.map((task)=>{
            if (task.id === id)
            {
                task.date = new Date(document.getElementById('date_select').value)
                task.label = document.getElementById('input_task').value
            }
            return task
        })
        setTasks(tasksEdited)
    }

    const checkTask = (e) => {
        setTasks(tasks.map(task => {
            if (task.id === e.target.id){
                task.done=true
            }
            return task
        }))  
    }

    const uncheckTask = (e) => {
        setTasks(tasks.map(task => {
            if (task.id === e.target.id){
                task.done=false 
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
        <div className="app">
            <Header />
            <div id="content">
                <div id="content_header">
                    <Title title={page.title} taskNumber={number}/>
                    <Links changePage={handlePage} changeFilter={handleFilter}/>
                </div>
                <div id="content_main">
                    <TaskList
                        filter={filter}
                        taskList={tasks}
                        changeNumber={handleNumber}
                        checkTask={checkTask}
                        uncheckTask={uncheckTask}
                        addTask={addTask}
                        editTask={editTask}
                        deleteTask={deleteTask} 
                    />
                </div>
              </div>
            <Footer />
        </div>
    )
}