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
    const [tasks, setTasks] = useState({isLoading: true, isError: false, tasks:[]})
    const [categories, setCategories] = useState({isLoading:true, isError: false, categories:[]})
    const [number, setNumber] = useState(0)
    const [reloadTasks,setReloadTasks] = useState(false)
    const [reloadCategories,setReloadCategories] = useState(false)
    
    /* fetch tasks */
    useEffect(() => {
        const fetchData = async () => {
            setTasks({ isLoading: true })
            await api.getAllTasks()
                .then(tasks => {
                    setTasks({
                        isLoading: false,
                        isError: false,
                        tasks: tasks.data.data
                    })
                })
                .catch(error => {
                    setTasks({
                        isLoading: false,
                        isError: true,
                        tasks: []
                    })
                })
        }
        fetchData()
    },[reloadTasks])

    /* fetch categories */
    useEffect(() => {
        const fetchData = async () => {
            setCategories({ isLoading: true })
            await api.getAllCategories()
                .then(categories => {
                    setCategories({
                        isLoading: false,
                        categories: categories.data.data
                    })
                })
                .catch(error => {
                    setCategories({
                        isLoading: false,
                        isError: true,
                        categories: []
                    })
                })
        }
        fetchData()
    }, [reloadCategories])

    /* Tasks operations */
    const addTask = async () => {
        await api.insertTask({
            done:false,
            doneDate:null,
            date:new Date(document.getElementById('select_task_date').value),
            label:document.getElementById('input_task_name').value,
            description:document.getElementById('input_task_description').value,
            categoryId:document.getElementById('select_category').value
        }).then(res => {
            setReloadTasks(!reloadTasks)
        })
    }
    const editTask = async (id) => {
        await api.updateTaskById(
            id,
            {
                date: new Date(document.getElementById('select_task_date').value),
                label: document.getElementById('input_task_name').value,
                description: document.getElementById('input_task_description').value,
                categoryId: document.getElementById('select_category').value
            }
        ).then(res => {
            setReloadTasks(!reloadTasks)
        })
    }
    const deleteTask = async (id) => {
        await api.deleteTaskById(id).then(res => {
            window.location.reload()
        }).then(res => {
            setReloadTasks(!reloadTasks)
        })
    }
    const checkTask = async (e) => {
        await api.updateTaskById(
            e.target.parentNode.id,
            {
                done:true,
                doneDate:new Date()
            }
        ).then(res=>{
            setReloadTasks(!reloadTasks)
        })
    }
    const uncheckTask = async (e) => {
        await api.updateTaskById(
            e.target.parentNode.id,
            {
                done:false,
                doneDate:null
            }
        ).then(res => {
            setReloadTasks(!reloadTasks)
        })
    }

    /* Category operations */
    const addCategory = async () => {
        await api.insertCategory(
            {
                color:document.getElementById('input_category_color').value,
                label:document.getElementById('input_category_name').value
            }
        ).then(res => {
            setReloadCategories(!reloadCategories)
        })
    }
    const editCategory = async (id) => {
        await api.updateCategoryById(
            id,
            {
                color: document.getElementById('input_category_color').value,
                label: document.getElementById('input_category_name').value
            }
        ).then(res => {
            setReloadCategories(!reloadCategories)
        })
    }
    const deleteCategory = async (id) => {
        await api.deleteCategoryById(id).then(res => {
            setReloadCategories(!reloadCategories)
        })
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
                            <Title title={moment().format('ddd').charAt(0).toUpperCase() + moment().format('dddd D MMMM YYYY').slice(1)} number={number} type={['tâche','tâches']}/>
                        </Route>
                        <Route exact path='/category/all'>
                            <Title title='Toutes les catégories' number={number} type={['catégorie','catégories']}/>
                        </Route>
                        <Links/>
                    </div>
                    <div id="content_main">
                        <Route exact path='/task/all'>
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
                        <Route exact path={['/','/task/today']}>
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