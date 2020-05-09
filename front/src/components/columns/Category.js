import React from 'react'
import { FaSquare } from 'react-icons/fa'

import "./Category.scss"

export const Category = (props) => {
    const category = props.categories.find(category=>props.id===category.id)
    return (
        <span className='column'>
            <FaSquare style={{color:category.color, marginRight:'5px'}}/> {category.label}
        </span>
    )  
}