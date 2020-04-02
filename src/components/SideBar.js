import React from 'react'
import { FaList, FaCheck, FaRegSquare } from 'react-icons/fa'
import "./SideBar.css"

export const SideBar = (props) => (
    <div id="sidebar">
        <ul>
            <li>
                <FaList />
                <span className='menu_item' onClick={()=>props.changeMenu(['opened','closed'])}>All tasks</span>
            </li>
            <li>
                <FaRegSquare />
                <span className='menu_item' onClick={()=>props.changeMenu(['opened'])}>Opened tasks</span>
            </li>
            <li>
                <FaCheck />
                <span className='menu_item' onClick={()=>props.changeMenu(['closed'])}>Closed tasks</span>
            </li>
        </ul>
    </div>
)