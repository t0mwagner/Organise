import React from 'react'
import { FaListAlt, FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from 'react-icons/fa'
import "./SideBar.css"

export const SideBar = (props) => {
    
    const now = new Date()
    const today = new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    const nextWeek = new Date(today)
    const nextMonth = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    return (
        <div id="sidebar">
            <ul>
                <li>
                    <FaListAlt />
                    <span className='menu_item' onClick={()=>props.changeFilter({})}>All tasks</span>
                </li>
                <li>
                    <FaCalendarDay />
                    <span className='menu_item' onClick={()=>props.changeFilter({status:'opened', date:today})}>Today</span>
                </li>
                <li>
                    <FaCalendarWeek />
                    <span className='menu_item' onClick={()=>props.changeFilter({status:'opened', date:nextWeek})}>This week</span>
                </li>
                <li>
                    <FaCalendarAlt />
                    <span className='menu_item' onClick={()=>props.changeFilter({status:'opened', date:nextMonth})}>This month</span>
                </li>
            </ul>
        </div>
    )
}