import React from 'react'
import { FaSquare } from 'react-icons/fa'

import "./CategoryColor.css"

export const CategoryColor = (props) => (
    <span className='column'>
        <FaSquare style={{color:props.color}}/>
    </span>
)