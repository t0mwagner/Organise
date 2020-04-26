import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FormModal, CategoryColor, TaskNumber } from '../../components'

import "./List.scss"
import "./CategoryList.scss"

export const CategoryList = (props) => {

    /* return the number of filtered items */
    props.numberHandler(props.collection.filter(item=>{
        if (item.hasOwnProperty('done'))
        {
            if (item.done){
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }).length)

    return (
        <div className="list">
            <FormModal
                mode='ajouter'
                label='catégorie'
                addHandler={props.addHandler}  
            />
            <section>
                <div className='list_header'>
                    <span className='list_title'>Catégories</span>
                </div>
                <ul>
                {
                    props.collection
                    .sort((a,b) => a.label > b.label)
                    .map((item,index) => (
                        <li key={index} id={item.id}>
                            <CategoryColor color={item.color} />
                            <span className='column'>{item.label}</span>
                            <TaskNumber id={item.id} tasks={props.tasks}/>
                            <FormModal 
                                mode='modifier'
                                label='catégorie'
                                item={item}
                                editHandler={props.editHandler}  
                            />
                            {
                                item.id === props.collection[0].id
                                ?
                                    <span className='btn_disabled'>
                                        <FaTrashAlt className='delete_btn_disabled' />
                                    </span>
                                :
                                    <FormModal
                                        mode='supprimer'
                                        label='catégorie'
                                        item={item}
                                        deleteHandler={props.deleteHandler}  
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