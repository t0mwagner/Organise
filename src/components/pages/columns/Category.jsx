import React from 'react'
import { FaSquare } from 'react-icons/fa'

export const Category = (props) => {
    if (props.categories.isLoading) {
        return <span className='column'>loading ...</span>
    } else {
        const category = props.categories.categories.find(category=>props.id===category._id)
        return (
            <span className='column'>
                <FaSquare style={{color:category.color, marginRight:'5px'}}/> {category.label}
            </span>
        ) 
    }
}