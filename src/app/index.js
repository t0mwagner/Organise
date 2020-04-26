import React, { useState } from 'react'
import { Header, Footer, Title, Links, TaskList, CategoryList} from '../components/'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'

import "./app.scss"

moment.locale('fr')

export const App = () => {

    /* Hooks */
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([{color:'#F2D2F2',label:'Général'}])
    const [number, setNumber] = useState(0)

    /* Tasks operations */
    const addTask = () => {
        const date = new Date(document.getElementById('select_task_date').value)
        setTasks([...tasks,
            {
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
                color:document.getElementById('input_category_color').value,
                label:document.getElementById('input_category_name').value
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

    /* list number */
    const handleNumber = (number) => {
        setNumber(number)
    }

    return (
        <div className="app">
            <Router>
                <Header />
                <div id="content">
                    <div id="content_header">
                        <Route exact path='/task/all'>
                            <Title title='Toutes les tâches' number={number} type={['tâche','tâches']}/>
                        </Route>
                        <Route exact path={['/','/task/today']}>
                            <Title title={moment().format('dddd D MMMM YYYY')} number={number} type={['tâche','tâches']}/>
                        </Route>
                        <Route exact path='/category/all'>
                            <Title title='Toutes les catégories' number={number} type={['catégorie','catégories']}/>
                        </Route>
                        <Links/>
                    </div>
                    <div id="content_main">
                        <Route exact path='/task/all'>
                            <TaskList
                                collection={tasks}
                                categories={categories}
                                filter={{}}
                                numberHandler={handleNumber}
                                addHandler={addTask}
                                editHandler={editTask}
                                deleteHandler={deleteTask}
                                checkHandler={checkTask}
                                uncheckHandler={uncheckTask} 
                            />
                        </Route>
                        <Route exact path={['/','/task/today']}>
                            <TaskList
                                collection={tasks}
                                categories={categories}
                                filter={{date:new Date()}}
                                numberHandler={handleNumber}
                                addHandler={addTask}
                                editHandler={editTask}
                                deleteHandler={deleteTask}
                                checkHandler={checkTask}
                                uncheckHandler={uncheckTask} 
                            />
                        </Route>
                        <Route exact path='/category/all'>
                            <CategoryList
                                collection={categories}
                                tasks={tasks}
                                numberHandler={handleNumber}
                                addHandler={addCategory}
                                editHandler={editCategory}
                                deleteHandler={deleteCategory}  
                            />
                        </Route>
                    </div>
                </div>
                <Footer />
            </Router>
        </div>
    )
}