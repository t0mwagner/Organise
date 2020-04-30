import React, { useState, useEffect } from 'react'
import api from '../../../api'
import { FaSquare } from 'react-icons/fa'

export const Category = (props) => {

    const [categories, setCategories] = useState({isLoading:true, isError: false, data:[]})

    /* fetch categories */
    useEffect(() => {
        const fetchData = async () => {
            setCategories({ isLoading: true })
            await api.getAllCategories()
                .then(categories => {
                    setCategories({
                        isLoading: false,
                        isError: false,
                        data: categories.data.data
                    })
                })
                .catch(error => {
                    setCategories({
                        isLoading: false,
                        isError: true,
                        data: []
                    })
                })
        }
        fetchData()
    }, [])

    if (categories.isLoading) {
        return <span className='column'>Chargement ...</span>
    } else {
        const category = categories.data.find(category=>props.id===category._id)
        return (
            <span className='column'>
                <FaSquare style={{color:category.color, marginRight:'5px'}}/> {category.label}
            </span>
        ) 
    }
}