import React from 'react'

import './CategoryForm.css'

export const CategoryForm = (props) => {
    
    const colors = ['#F2D2F2','#A33FC4','#8BAAF5','#F2A127','#F23827','#A7D552']

    return (
        <span className="fields">
            <label htmlFor="input_category_name">* Titre</label>
            <input type="text" id="input_category_name" maxLength='20' required defaultValue=
            {
                (props.item)&&props.item.label
            }
            />
            <p className='label'>* Sélectionnez une couleur</p>
            <ul className="color_list">
                {
                    colors.map((color,index)=>(
                        <li 
                            key={index}
                            style={{backgroundColor:color}}
                            className={(props.item)?(props.item.color===color)?'active color':'color':'color'}
                            onClick={(e)=>{
                                for (let node of e.target.parentNode.childNodes)
                                {
                                    node.classList.remove('active')
                                }
                                e.target.classList.add('active')
                                document.getElementById('input_category_color').value=color
                            }}
                        >
                        </li>
                    ))
                }
            </ul>
            <input type="text" id="input_category_color" style={{display:'none'}} defaultValue={colors[0]} />
        </span>
    )
}