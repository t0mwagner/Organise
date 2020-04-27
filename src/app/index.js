import React, { useState, useEffect } from 'react'
import { Header, Footer, Title, Links, TaskList, CategoryList} from '../components/'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import api from '../api'
import moment from 'moment'
import 'moment/locale/fr'

import "./app.scss"

moment.locale('fr')

export const App = () => {

    /* Hooks */
    const [tasks, setTasks] = useState({isLoading: true, tasks:[]})
    const [categories, setCategories] = useState({isLoading:true, categories:[]})
    const [number, setNumber] = useState(0)
  
    /* fetch tasks */
    useEffect(() => {
        async function fetchData() {
            setTasks({ isLoading: true })
            await api.getAllTasks().then(tasks => {
                setTasks({
                    tasks: tasks.data.data,
                    isLoading: false
                })
            })
        }
        fetchData()
    }, [])

    /* fetch categories */
    useEffect(() => {
        async function fetchData() {
            setCategories({ isLoading: true })
            await api.getAllCategories().then(categories => {
                setCategories({
                    categories: categories.data.data,
                    isLoading: false
                })
            })
        }
        fetchData()
    }, [])

    /* Tasks operations */
    const addTask = () => {
        api.insertTask({
            done:false,
            doneDate:null,
            date:new Date(document.getElementById('select_task_date').value),
            label:document.getElementById('input_task_name').value,
            description:document.getElementById('input_task_description').value,
            categoryId:document.getElementById('select_category').value
        })
        window.location.reload()
    }
    const editTask = (id) => {
        api.updateTaskById(
            id,
            {
                date: new Date(document.getElementById('select_task_date').value),
                label: document.getElementById('input_task_name').value,
                description: document.getElementById('input_task_description').value,
                categoryId: document.getElementById('select_category').value
            }
        )
        window.location.reload()
    }
    const deleteTask = (id) => {
        api.deleteTaskById(id)
        window.location.reload()
    }
    const checkTask = (e) => {
        api.updateTaskById(
            e.target.parentNode.id,
            {
                done:true,
                doneDate:new Date()
            }
        )

    }
    const uncheckTask = (e) => {
        api.updateTaskById(
            e.target.parentNode.id,
            {
                done:false,
                doneDate:null
            }
        )

    }

    /* Category operations */
    const addCategory = () => {
        api.insertCategory(
            {
                color:document.getElementById('input_category_color').value,
                label:document.getElementById('input_category_name').value
            }
        )
        window.location.reload()
    }
    const editCategory = (id) => {
        api.updateCategoryById(
            id,
            {
                color: document.getElementById('input_category_color').value,
                label: document.getElementById('input_category_name').value
            }
        )
        window.location.reload()
    }
    const deleteCategory = (id) => {
        api.deleteCategoryById(id)
        window.location.reload()
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
                        <Route exact path={['/','/task/all']}>
                            <Title title='Toutes les tâches' number={number} type={['tâche','tâches']}/>
                        </Route>
                        <Route exact path='/task/today'>
                            <Title title={moment().format('ddd').charAt(0).toUpperCase() + moment().format('dddd D MMMM YYYY').slice(1)} number={number} type={['tâche','tâches']}/>
                        </Route>
                        <Route exact path='/category/all'>
                            <Title title='Toutes les catégories' number={number} type={['catégorie','catégories']}/>
                        </Route>
                        <Links/>
                    </div>
                    <div id="content_main">
                        <Route exact path={['/','/task/all']}>
                            { 
                                !tasks.isLoading
                                ?
                                <TaskList
                                    collection={tasks.tasks}
                                    categories={categories}
                                    filter={{}}
                                    numberHandler={handleNumber}
                                    addHandler={addTask}
                                    editHandler={editTask}
                                    deleteHandler={deleteTask}
                                    checkHandler={checkTask}
                                    uncheckHandler={uncheckTask} 
                                />
                                :'Chargement de la liste des tâches...'
                            }
                        </Route>
                        <Route exact path='/task/today'>
                        { 
                                !tasks.isLoading
                                ?
                                <TaskList
                                    collection={tasks.tasks}
                                    categories={categories}
                                    filter={{date:moment().endOf('day')}}
                                    numberHandler={handleNumber}
                                    addHandler={addTask}
                                    editHandler={editTask}
                                    deleteHandler={deleteTask}
                                    checkHandler={checkTask}
                                    uncheckHandler={uncheckTask} 
                                />
                                :'Chargement de la liste des tâches...'
                        }
                        </Route>
                        <Route exact path='/category/all'>
                            {
                                !categories.isLoading
                                ?
                                <CategoryList
                                    collection={categories.categories}
                                    tasks={tasks.tasks}
                                    numberHandler={handleNumber}
                                    addHandler={addCategory}
                                    editHandler={editCategory}
                                    deleteHandler={deleteCategory}  
                                />
                                : 'Chargement de la liste des catégories...'
                            }
                            
                        </Route>
                    </div>
                </div>
                <Footer />
            </Router>
        </div>
    )
}