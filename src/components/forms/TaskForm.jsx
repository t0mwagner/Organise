import React from 'react'
import { useCategoryApi } from '../../hooks/useCategoryApi'
import DatePicker, { registerLocale } from 'react-datepicker'
import en from "date-fns/locale/en-GB"
import { FaSquare } from 'react-icons/fa'

import './TaskForm.scss'

registerLocale("en", en)

export const TaskForm = (props) => {
    
    const [categories,] = useCategoryApi()
    let categoryDisplay = false  

    return (
        <span className="fields">
            <label htmlFor="input_task_name">* Titre</label>
            <input type="text" id="input_task_name" maxLength='50' required defaultValue=
            {
                (props.item)&&props.item.label
            }
            />
            <label htmlFor="input_task_description">Description</label>
            <textarea id="input_task_description" name="input_task_description" rows="5" cols="20">
            {
                (props.item)&&props.item.description
            }
            </textarea>
            <label htmlFor="select_task_date">* Date de fin</label>
            <DatePicker 
                id="select_task_date"
                selected={props.date}
                showTimeSelect 
                timeIntervals={15}
                timeFormat="HH:mm"
                onChange={props.changeDate}
                dateFormat="dd MMM yyyy HH:mm"
                locale="en"
                required  
            />
            <label htmlFor="select_category">Categorie</label>
            <ul id='category_list'>
                <li className='disabled'></li>
                {
                    categories.isLoading
                    ? 'Chargement ...'
                    : categories.data.map((category,index)=>{
                        return (
                            <li
                                key={index}
                                className={
                                    (props.item)
                                    ? (props.item.categoryId === category._id)
                                        && 'display neutral'
                                    : (index===0)
                                        && 'display neutral'
                                }
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
                                            } else {
                                                node.classList.add('selected')
                                                node.classList.add('neutral')
                                            }
                                        }
                                        categoryDisplay = !categoryDisplay
                                    }
                                    document.getElementById('select_category').value=category._id
                                }}
                            >
                                <FaSquare className='square' style={{color:category.color}}/> {category.label}
                            </li>
                        )
                    })
                }
            </ul>
            <input type="text" id="select_category" defaultValue={
                (props.item)
                ? props.item.categoryId
                : categories.isLoading
                ? 'Chargement...'
                : categories.data[0]._id
            }/>
        </span>
    )
}