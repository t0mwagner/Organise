import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import "./Detail.css"

export const CategoryColor = (props) => {
    
    return (
        <span className='column'>
            <FaChevronDown style={{color:props.color}}/>
        </span>
    )
}