import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FormModal, CategoryColor, TaskNumber } from '../components'

import "./List.scss"
import "./CategoryList.scss"

export const CategoryList = (props) => {

    let filteredCollection = ""
 
    /* Filter handler */
    if (props.filter){
        filteredCollection = props.collection.filter(item=>{
            let itemOk = true
            for (let [key, value] of Object.entries(props.filter)) {
                if (item[key] !== value) itemOk = false
            }
            return itemOk
        })
    } else {
        filteredCollection = props.collection
    }

    /* return the number of filtered items */
    props.numberHandler(filteredCollection.filter(item=>{
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
                    filteredCollection
                    .sort((a,b) => a.label > b.label)
                    .map((item,index) => (
                        <li key={index} id={item.id}>
                            <CategoryColor color={item.color} />
                            <span className='column'>{item.label}</span>
                            <TaskNumber id={item.id} tasks={tasks}/>
                            <FormModal 
                                mode='modifier'
                                label='catégorie'
                                item={item}
                                editHandler={props.editHandler}  
                            />
                            {
                                item.id === filteredCollection[0].id
                                ?
                                    <span class='btn_disabled'>
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