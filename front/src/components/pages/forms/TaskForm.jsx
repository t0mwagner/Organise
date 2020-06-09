// React
import React, { useState } from 'react'
// Date
import "flatpickr/dist/themes/airbnb.css"
import Flatpickr from "react-flatpickr"
import moment from 'moment'
// Apollo
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// Modal
import MicroModal from 'micromodal'
// Styles
import './TaskForm.scss'
import './general.scss'

/* GQL Queries */
const FEED_PROJECTS = gql`
{
    feedProjects,
    {
        id
        name
        color
    }
}
`

export const TaskForm = (props) => {

    /* hooks */
    const { loading, error, data } = useQuery(FEED_PROJECTS)
    const [ date, setDate ] = useState(moment().format('dddd Do MMMM YYYY HH:mm'))
    let categoryDisplay = false

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    return (
        <form>
            {
                (props.action.code === 'D')
                ?<span className='delete_alert'>Supprimer la tâche <strong>{props.task.name}</strong> ?</span>
                :
                <span className="fields">
                    <label htmlFor={props.action.code+"-input_task_name"}>* Nom de la tâche</label>
                    <input type="text" id={props.action.code+"-input_task_name"} maxLength='50' required />
                    <label htmlFor={props.action.code+"-input_task_description"}>Description</label>
                    <textarea id={props.action.code+"-input_task_description"} className="input_task_description" name="input_task_description" rows="5" cols="20"/>
                    <label htmlFor={props.action.code+"-input_task_date"}>* Date de fin</label>
                    <Flatpickr
                        id={props.action.code+"-input_task_date"}
                        options={{
                            enableTime: true,
                            dateFormat: "l j F Y H:i",
                        }}
                        value={date}
                        onChange={date => {
                        setDate(moment(date).format('dddd Do MMMM YYYY HH:mm'));
                        }}
                    />
                    <label htmlFor="select_project">Projet</label>
                    <ul className='project_list'>
                        <li className='disabled'></li>
                        {
                            data.feedProjects.map((project,index)=>
                                <li
                                    key={index}
                                    onChange={()=>{
                                        document.getElementById(props.action.code+"-select_project").value=project.id
                                    }}
                                    className={(index===0)?'display':''}
                                    onClick={(e)=>{
                                        if (!categoryDisplay)
                                        {
                                            for (let node of e.target.parentNode.childNodes)
                                            {
                                                (node !== e.target)
                                                && node.classList.toggle('display')
                                                node.classList.remove('neutral')
                                            }
                                            categoryDisplay = !categoryDisplay
                                        } else {
                                            for (let node of e.target.parentNode.childNodes)
                                            {
                                                if (node !== e.target)
                                                {
                                                    node.classList.remove('display')
                                                    node.classList.remove('selected')
                                                } else {
                                                    node.classList.add('selected')
                                                    node.classList.add('neutral')
                                                }
                                            }
                                            categoryDisplay = !categoryDisplay
                                        }
                                        document.getElementById(props.action.code+"-select_project").value=project.id
                                    }}
                                >
                                    <i className="fas fa-square square" style={{color:project.color}}/> {project.name}
                                </li>
                            )
                        }
                    </ul>
                    <input type="text" id={props.action.code+"-select_project"} className="noDisplay" defaultValue={data.feedProjects[0].id}/>
                </span>
            }
            <footer className="modal__footer">
                <button className="modal__btn" type="submit" onClick={(e)=>
                {
                    let query
                    e.preventDefault()
                    // Create query
                    if (props.action.code === 'C')
                    {
                        query = {variables :
                            {
                                name:document.getElementById(props.action.code+"-input_task_name").value,
                                description:document.getElementById(props.action.code+"-input_task_description").value,
                                categoryId:document.getElementById(props.action.code+"-select_project").value,
                                dueDate:new Date(document.getElementById(props.action.code+"-input_task_date").value)
                            }
                        }
                    }
                    // Update query
                    if (props.action.code === 'U')
                    {
                        query = {variables :
                            {
                                id:props.task.id,
                                name:document.getElementById(props.action.code+"-input_task_name").value,
                                description:document.getElementById(props.action.code+"-input_task_description").value,
                                categoryId:document.getElementById(props.action.code+"-select_project").value,
                                dueDate:new Date(document.getElementById(props.action.code+"-input_task_date").value)
                            }
                        }
                    }
                    // Delete query
                    if (props.action.code === 'D')
                    {
                        query = {variables :
                            {
                                id:props.task.id
                            }
                        }
                    }
                    // Query call
                    if (props.action.code === 'D'){
                        props.action.query(query)
                        MicroModal.close(props.id)
                    } else {
                        if (document.getElementById(props.action.code+"-input_task_name").value && document.getElementById(props.action.code+"-select_project").value && document.getElementById(props.action.code+"-input_task_date").value){
                            props.action.query(query)
                            MicroModal.close(props.id)
                        }
                    }
                }}>
                    {props.action.name}
                </button>
            </footer>
        </form>
    )
}