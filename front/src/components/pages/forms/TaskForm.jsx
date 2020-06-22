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
    const [ date, setDate ] = useState(moment().endOf('day').format('YYYY-MM-DD HH:mm'))
    let projectDisplay = false

    if (loading) return 'Loading...'
    if (error) return `error : ${error.message}`

    return (
        <form>
            {
                (props.action.code === 'D')
                ?<span className='delete_alert'>Delete task <strong>{props.task.name}</strong> ?</span>
                :
                <span className="fields">
                    <label htmlFor={props.action.code+"-input_task_name"}>* Task name</label>
                    <input type="text" id={props.action.code+"-input_task_name"} maxLength='50' required />
                    <label htmlFor={props.action.code+"-input_task_description"}>Description</label>
                    <textarea id={props.action.code+"-input_task_description"} className="input_task_description" name="input_task_description" rows="5" cols="20"/>
                    <label htmlFor={props.action.code+"-input_task_date"}>* Due date</label>
                    <Flatpickr
                        id={props.action.code+"-input_task_date"}
                        options={{
                            enableTime: true,
                            altInput: true,
                            altFormat: "F j, Y H:i",
                            dateFormat: "Y-m-d H:i"
                        }}
                        value={
                            (props.task)
                            ? moment(new Date(props.task.dueDate)).format('YYYY-MM-DD HH:mm')
                            : date
                        }
                        onChange={date => {
                        setDate(moment(date).format('YYYY-MM-DD HH:mm'));
                        }}
                    />
                    <label htmlFor="select_project">Project</label>
                    <ul className='project_list' id={props.action.code+'-project_list'}>
                        <li className='disabled'></li>
                        {
                            data.feedProjects.map((project,index)=> (
                                <li
                                    id={props.action.code+'-'+project.id}
                                    key={index}
                                    onChange={()=>{
                                        document.getElementById(props.action.code+"-select_project").value=project.id
                                    }}
                                    onClick={(e)=>{
                                        if (!projectDisplay)
                                        {
                                            for (let node of e.target.parentNode.childNodes)
                                            {
                                                (node !== e.target)
                                                && node.classList.toggle('display')
                                                node.classList.remove('neutral')
                                            }
                                            projectDisplay = !projectDisplay
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
                                            projectDisplay = !projectDisplay
                                        }
                                        document.getElementById(props.action.code+"-select_project").value=project.id
                                    }}
                                >
                                    <i className="fas fa-square square" style={{color:project.color}}/> {project.name}
                                </li>
                            ))
                        }
                    </ul>
                    <input type="text" id={props.action.code+"-select_project"} className="noDisplay" defaultValue={data.feedProjects[0].id} />
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
                                project:{id:document.getElementById(props.action.code+"-select_project").value},
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
                                project:{id:document.getElementById(props.action.code+"-select_project").value},
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