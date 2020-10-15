// React
import React from 'react'
// Modal
import MicroModal from 'micromodal'
import { TaskNumber } from '../../../components'
// Styles
import './form.scss'


const ProjectDeleteForm = ({project}) => {

    return (
        <span className='delete-alert'>
            <span className='delete-alert__text'>Delete project <strong>{project.name}</strong> ?</span>
            <span className='delete-alert__modal-indication'><TaskNumber id={project.id} display='line' /> will be reassigned to default project</span>
        </span>
    )
}

export const ProjectForm = (props) => {

    const colors = ['#F2D2F2','#A33FC4','#8BAAF5','#F2A127','#F23827','#A7D552']

    return (
        <form>
            {
                (props.action.code === 'D')
                ?<ProjectDeleteForm project={props.project}/>
                :
                <span className="fields">
                    <label className="fields__label" htmlFor={props.action.code+"-input_project_name"}>* Project name</label>
                    <input className="fields__input" type="text" id={props.action.code+"-input_project_name"} maxLength='50' required />
                    <p className="fields__label">* Pick a color</p>
                    <ul className="fields__color-list">
                        {
                            colors.map((color,index)=>(
                                <li 
                                    key={index}
                                    style={{backgroundColor:color}}
                                    className={(props.project)?(props.project.color===color)?'fields__color-item fields__color-item--active':'fields__color-item':(index===0)?'fields__color-item fields__color-item--active':'fields__color-item'}
                                    onClick={(e)=>{
                                        for (let node of e.target.parentNode.childNodes)
                                        {
                                            node.classList.remove('fields__color-item--active')
                                        }
                                        e.target.classList.add('fields__color-item--active')
                                        document.getElementById(props.action.code+"-input_project_color").value=color
                                    }}
                                >
                                </li>
                            ))
                        }
                    </ul>
                    <input type="text" id={props.action.code+"-input_project_color"} style={{display:'none'}} defaultValue={colors[0]} />
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
                                name:document.getElementById(props.action.code+"-input_project_name").value,
                                color:document.getElementById(props.action.code+"-input_project_color").value
                            }
                        }
                    }
                    // Update query
                    if (props.action.code === 'U')
                    {
                        query = {variables :
                            {
                                id:props.project.id,
                                name:document.getElementById(props.action.code+"-input_project_name").value,
                                color:document.getElementById(props.action.code+"-input_project_color").value
                            }
                        }
                    }
                    // Delete query
                    if (props.action.code === 'D') query = props.project
                    // Query call
                    if (props.action.code === 'D'){
                        props.action.query(query)
                        MicroModal.close(props.id)
                    } else {
                        if (document.getElementById(props.action.code+"-input_project_name").value && document.getElementById(props.action.code+"-input_project_color").value){
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