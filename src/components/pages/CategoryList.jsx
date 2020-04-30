import React from 'react'
import { useCategoryApi } from '../../hooks/useCategoryApi'
import { FaTrashAlt } from 'react-icons/fa'
import { FormModal, CategoryColor, TaskNumber } from '../../components'
import api from '../../api'

import "./List.scss"
import "./CategoryList.scss"

export const CategoryList = ({numberHandler}) => {

    /* Local state hook */
    const [categories, reload] = useCategoryApi()

    /* Category operations */
    const insertCategory = async () => {
        await api.insertCategory(
            {
                color:document.getElementById('input_category_color').value,
                label:document.getElementById('input_category_name').value
            }
        ).then(res => {
            reload()
        })
    }
    const updateCategory = async (id) => {
        await api.updateCategoryById(
            id,
            {
                color: document.getElementById('input_category_color').value,
                label: document.getElementById('input_category_name').value
            }
        ).then(res => {
            reload()
        })
    }
    const deleteCategory = async (id) => {
        await api.getTasksByCategoryId(id)
        .then(res => {
            console.log(res)
            res.data.data.forEach(task => {
                api.updateTaskById(task._id,{categoryId:categories.data[0]._id})
            });
        })
        await api.deleteCategoryById(id)
        .then(res => {
            reload()
        })
    }

    /* return the number of items */
    if (!categories.isLoading) numberHandler(categories.data.length)

    return (
        <div className="list">
            <FormModal
                mode='ajouter'
                label='catégorie'
                insertHandler={insertCategory}  
            />
            <section>
                <div className='list_header'>
                    <span className='list_title'>Catégories</span>
                </div>
                <ul>
                {
                    !categories.isLoading
                    &&
                    categories.data
                    .sort((a,b) => a.label > b.label)
                    .map((category,index) => (
                        <li key={index} id={category._id} style={{gridTemplateColumns: '30px 1fr 150px 30px 30px'}}>
                            <CategoryColor color={category.color} />
                            <span className='column'>{category.label}</span>
                            <TaskNumber id={category._id} />
                            <FormModal 
                                mode='modifier'
                                label='catégorie'
                                item={category}
                                updateHandler={updateCategory}  
                            />
                            {
                                category._id === categories.data[0]._id
                                ?
                                    <span className='btn_disabled'>
                                        <FaTrashAlt className='delete_btn_disabled' />
                                    </span>
                                :
                                    <FormModal
                                        mode='supprimer'
                                        label='catégorie'
                                        item={category}
                                        deleteHandler={deleteCategory}  
                                    />
                            }
                            
                        </li>
                    ))
                }
                </ul>
            </section> 
        </div>
    )
}