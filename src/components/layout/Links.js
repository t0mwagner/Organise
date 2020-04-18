import React from 'react'
import "./Links.css"

export const Links = (props) => {

    const now = new Date()
    const today = new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);

    return (
        <div id="links">
            <ul>
                <li>
                    <span className='menu_item' onClick={(e)=>{
                        props.changePage({title:'Toutes les tâches', type:['tâche','tâches']})
                        props.changeFilter({})
                        e.target.parentNode.parentNode.childNodes.forEach(element => {
                            element.childNodes[0].classList.remove('selected_link')
                        })
                        e.target.classList.add('selected_link')
                    }}>Toutes les tâches</span>
                </li>
                <li>
                    <span className='menu_item' onClick={(e)=>{
                        props.changePage({title:now.toLocaleString([],{weekday:'long'})[0].toUpperCase() + now.toLocaleString([],{weekday:'long'}).slice(1) + ' ' + now.toLocaleString([],{day:'numeric',month:'long'}), type:['tâche','tâches']})
                        props.changeFilter({date:today})
                        e.target.parentNode.parentNode.childNodes.forEach(element => {
                            element.childNodes[0].classList.remove('selected_link')
                        })
                        e.target.classList.add('selected_link')
                    }}>Aujourd'hui</span>
                </li>
                <li>
                    <span className='menu_item' onClick={(e)=>{
                        props.changePage({title:'Catégories', type:['catégorie','catégories']})
                        props.changeFilter({})
                        e.target.parentNode.parentNode.childNodes.forEach(element => {
                            element.childNodes[0].classList.remove('selected_link')
                        })
                        e.target.classList.add('selected_link')
                    }}>Catégories</span>
                </li>
            </ul>
        </div>
    )
}