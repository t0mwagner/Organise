import React, { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Title } from './components/Title'
import { Links } from './components/Links'
import { List } from './components/List'
import { DueTime } from './components/DueTime'
import { FaRegSquare, FaCheck, FaFolder } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';

import "./App.css"

export const App = () => {

    /* Dates */
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const now = new Date()
    const today = new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    const today_textual = days[today.getDay()] + ", " + today.getDate() + " " + months[today.getMonth()]

    /* Hooks */
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([{id:uuidv4(),color:'#F2D2F2',label:'General'}])
    const [page, setPage] = useState({title:today_textual, type:['task','tasks']})
    const [filter, setFilter] = useState({date:today})
    const [number, setNumber] = useState(0)

    /* Tasks operations */
    const addTask = () => {
        const date = new Date(document.getElementById('select_task_date').value)
        setTasks([...tasks,
            {
                id:uuidv4(),
                done:false,
                date:date,
                label:document.getElementById('input_task_name').value,
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
            }
            return task
        }))  
    }
    const uncheckTask = (e) => {
        setTasks(tasks.map(task => {
            if (task.id === e.target.parentNode.id){
                task.done=false 
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
                    <Links changePage={handlePage} changeFilter={handleFilter} today={[today,today_textual]}/>
                </div>
                <div id="content_main">
                    {
                        (page.type[0]==='task')
                        ?
                            <List
                                label={['task','tasks']}
                                collection={tasks}
                                categories={categories}
                                filter={filter}
                                sortFunction={(a,b) => (new Date(a.date)<new Date(b.date)?-1:1)}
                                icons={{
                                    icon1:<FaRegSquare className='click_icon' onClick={checkTask}/>,
                                    icon2:<FaCheck className='click_icon' onClick={uncheckTask}/>
                                }}
                                displaySwitcher='done'
                                columns={['label','category',<DueTime />]}
                                grid={{gridTemplateColumns: '30px 1fr 100px 150px 30px 30px'}}
                                numberHandler={handleNumber}
                                addHandler={addTask}
                                editHandler={editTask}
                                deleteHandler={deleteTask}  
                            />
                        :
                            <List
                                label={['category','categories']}
                                collection={categories}
                                filter={filter}
                                sortFunction={(a,b) => a.label > b.label}
                                icons={{
                                    icon1:<FaFolder className='icon' />
                                }}
                                displaySwitcher=''
                                columns={['label','color','taskNumber']}
                                grid={{gridTemplateColumns: '30px 1fr 100px 150px 30px 30px'}}
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