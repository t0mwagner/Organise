import React from 'react'
import "./Links.css"

export const Links = (props) => {
    
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const now = new Date()
    const today = new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    const today_textual = days[today.getDay()] + ", " + today.getDate() + " " + months[today.getMonth()]

    return (
        <div id="links">
            <ul>
                <li>
                    <span className='menu_item' onClick={()=>{
                        props.changePage({title:'All tasks'})
                        props.changeFilter({})
                    }}>All tasks</span>
                </li>
                <li>
                    <span className='menu_item' onClick={()=>{
                        props.changePage({title:today_textual})
                        props.changeFilter({date:today})
                    }}>Today</span>
                </li>
                <li>
                    <span className='menu_item' onClick={()=>{
                        props.changePage({title:'Categories'})
                        props.changeFilter({})
                    }}>Categories</span>
                </li>
            </ul>
        </div>
    )
}