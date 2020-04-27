import React, { useState } from 'react'
import { FormModal, Category, DueTime } from '../../components'

import "./List.scss"
import "./TaskList.scss"

export const TaskList = (props) => {

    /* switch to display or hide done tasks */
    const [displayAlt, setDisplayAlt] = useState(false)
    let filteredCollection = ""
 
    /* Filter Handler */
    if (props.filter){
        filteredCollection = props.collection.filter(item=>{
            let itemOk = true
            for (let [key, value] of Object.entries(props.filter)) {
                if (key === 'date'){
                    if (new Date(item.date) > new Date(value)) itemOk = false
                }
                else if (item[key] !== value) itemOk = false
            }
            return itemOk
        })
    } else {
        filteredCollection = props.collection
    }

    /* Update the number of items displayed */
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
                label='tâche'
                categories={props.categories.categories}
                addHandler={props.addHandler}  
            />
            <section>
                <div className='list_header'>
                    <span className='list_title'>Tâches</span>
                    <span className='list_button' onClick={()=>setDisplayAlt(!displayAlt)}>{!displayAlt?'Afficher ':'Masquer '}les tâches terminées</span>
                </div>
                <ul>
                {
                    filteredCollection.length === 0
                    ?
                        <p className='no_item'>Aucune tâche !</p>
                    :
                        filteredCollection
                        .sort((a,b) => (new Date(a.date)<new Date(b.date)?-1:1))
                        .map((item,index) => (
                            (!item.done || displayAlt)
                            &&
                            <li key={index} id={item._id} className={item.done?'alt_li':''} style={{gridTemplateColumns: '30px 1fr 130px 200px 30px 30px'}}>
                                {
                                    item.done
                                    ? <i className="fas fa-check-square click_icon" onClick={props.uncheckHandler}></i>
                                    : <i className="far fa-square click_icon" onClick={props.checkHandler}></i>
                                }
                                <span className='column'>{item.label}</span>
                                <Category id={item.categoryId} categories={props.categories} />
                                <DueTime date={item.date} doneDate={item.doneDate} />
                                <FormModal 
                                    mode='modifier'
                                    label='tâche'
                                    categories={props.categories.categories}
                                    item={item}
                                    editHandler={props.editHandler}  
                                />
                                <FormModal
                                    mode='supprimer'
                                    label='tâche'
                                    item={item}
                                    deleteHandler={props.deleteHandler}  
                                />
                            </li>
                        ))
                }
                </ul>
            </section> 
        </div>
    )
}