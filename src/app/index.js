import React, { useState } from 'react'
import { Header, Footer, Title, Links, TaskList, CategoryList} from '../components/'

import "./app.scss"

export const App = () => {

    /* Hooks */
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([{id:uuidv4(),color:'#F2D2F2',label:'Général'}])
    const [page, setPage] = useState({title:new Date().toLocaleString([],{weekday:'long'})[0].toUpperCase() + new Date().toLocaleString([],{weekday:'long'}).slice(1) + ' ' + new Date().toLocaleString([],{day:'numeric',month:'long'}), type:['tâche','tâches']})
    const [filter, setFilter] = useState({date:new Date()})
    const [number, setNumber] = useState(0)

    /* Tasks operations */
    const addTask = () => {
        const date = new Date(document.getElementById('select_task_date').value)
        setTasks([...tasks,
            {
                id:uuidv4(),
                done:false,
                doneDate:null,
                date:date,
                label:document.getElementById('input_task_name').value,
                description:document.getElementById('input_task_description').value,
                categoryId:document.getElementById('select_category').value
            }
        ])
    }
    const editTask = (id) => {
        const tasksEdited = tasks.map((task)=>{
            if (task.id === id)
            {
                task.date = new Date(document.getElementById('select_task_date').value)
                task.label = document.getElementById('input_task_name').value
                task.description = document.getElementById('input_task_description').value
                task.categoryId=document.getElementById('select_category').value
            }
            return task
        })
        setTasks(tasksEdited)
    }
    const deleteTask = (id) => {
        setTasks(tasks.filter(task=>task.id !== id))
    }
    const checkTask = (e) => {
        setTasks(tasks.map(task => {
            if (task.id === e.target.parentNode.id){
                task.done=true
                task.doneDate=new Date()
            }
            return task
        }))  
    }
    const uncheckTask = (e) => {
        setTasks(tasks.map(task => {
            if (task.id === e.target.parentNode.id){
                task.done=false 
                task.doneDate = null
            }
            return task
        })) 
    }

    /* Category operations */
    const addCategory = () => {
        setCategories([...categories,
            {
                id:uuidv4(),
                color:document.getElementById('input_category_color').value,
                label:document.getElementById('input_category_name').value,
            }
        ])
    }
    const editCategory = (id) => {
        const categoriesEdited = categories.map((category)=>{
            if (category.id === id)
            {
                category.color = document.getElementById('input_category_color').value
                category.label = document.getElementById('input_category_name').value
            }
            return category
        })
        setCategories(categoriesEdited)
    }
    const deleteCategory = (id) => {
        for (let task of tasks)
        {
            if (task.categoryId === id)
            {
                task.categoryId = categories[0].id
            }
        }
        setCategories(categories.filter(category=>category.id !== id))
    }

    /* Page and filter */
    const handlePage = (page) => {
        setPage(page)
    }
    const handleNumber = (number) => {
        setNumber(number)
    }
    const handleFilter = (filter) => {
        setFilter(filter)
    }  

    return (
        <div className="app">
            <Header />
            <div id="content">
                <div id="content_header">
                    <Title title={page.title} number={number} type={page.type}/>
                    <Links changePage={handlePage} changeFilter={handleFilter}/>
                </div>
                <div id="content_main">
                    {
                        (page.type[0]==='tâche')
                        ?
                            <TaskList
                                collection={tasks}
                                categories={categories}
                                filter={filter}
                                numberHandler={handleNumber}
                                addHandler={addTask}
                                editHandler={editTask}
                                deleteHandler={deleteTask}
                                checkHandler={checkTask}
                                uncheckHandler={uncheckTask} 
                            />
                        :
                            <CategoryList
                                collection={categories}
                                filter={filter}
                                numberHandler={handleNumber}
                                addHandler={addCategory}
                                editHandler={editCategory}
                                deleteHandler={deleteCategory}  
                            />
                    }
                </div>
              </div>
            <Footer />
        </div>
    )
}