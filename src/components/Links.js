import React from 'react'
import "./Links.css"

export const Links = (props) => (
    <div id="links">
        <ul>
            <li>
                <span className='menu_item' onClick={()=>{
                    props.changePage({title:'All tasks', type:['task','tasks']})
                    props.changeFilter({})
                }}>All tasks</span>
            </li>
            <li>
                <span className='menu_item' onClick={()=>{
                    props.changePage({title:props.today[1], type:['task','tasks']})
                    props.changeFilter({date:props.today[0]})
                }}>Today</span>
            </li>
            <li>
                <span className='menu_item' onClick={()=>{
                    props.changePage({title:'Categories', type:['category','categories']})
                    props.changeFilter({})
                }}>Categories</span>
            </li>
        </ul>
    </div>
)