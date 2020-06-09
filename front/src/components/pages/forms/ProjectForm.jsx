// React
import React from 'react'
// Modal
import MicroModal from 'micromodal'
// Styles
import './ProjectForm.scss'
import './general.scss'


export const ProjectForm = (props) => {

    const colors = ['#F2D2F2','#A33FC4','#8BAAF5','#F2A127','#F23827','#A7D552']

    return (
        <form>
            {
                (props.action.code === 'D')
                ?<span className='delete_alert'>Supprimer le projet <strong>{props.project.name}</strong> ?</span>
                :
                <span className="fields">
                    <label htmlFor={props.action.code+"-input_project_name"}>* Nom du projet</label>
                    <input type="text" id={props.action.code+"-input_project_name"} maxLength='50' required />
                    <p className='label'>* Sélectionnez une couleur</p>
                    <ul id="color_list">
                        {
                            colors.map((color,index)=>(
                                <li 
                                    key={index}
                                    style={{backgroundColor:color}}
                                    className={(props.project)?(props.project.color===color)?'active color':'color':(index===0)?'active color':'color'}
                                    onClick={(e)=>{
                                        for (let node of e.target.parentNode.childNodes)
                                        {
                                            node.classList.remove('active')
                                        }
                                        e.target.classList.add('active')
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
                    if (props.action.code === 'D')
                    {
                        query = {variables :
                            {
                                id:props.project.id
                            }
                        }
                    }
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