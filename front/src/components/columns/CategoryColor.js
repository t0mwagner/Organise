import React from 'react'
import { FaSquare } from 'react-icons/fa'

import "./CategoryColor.scss"

export const CategoryColor = (props) => (
    <span className='column'>
        <FaSquare style={{color:props.color}}/>
    </span>
)