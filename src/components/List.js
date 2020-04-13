import React, { useState } from 'react'
import { FormModal } from './FormModal'

import "./List.css"

export const List = (props) => {

    const [displayAlt, setDisplayAlt] = useState(false)
    let filteredCollection = ""
 
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
                mode='add'
                label={props.label[0]}
                categories={(props.categories)?props.categories:''}
                addHandler={props.addHandler}  
            />
            <section>
                <div className='list_header'>
                    <span className='list_title'>{props.label[1].charAt(0).toUpperCase() + props.label[1].slice(1)}</span>
                    {
                        (props.displaySwitcher)
                        &&
                            <span className='list_button' onClick={()=>setDisplayAlt(!displayAlt)}>
                                {
                                    (displayAlt)
                                    ?
                                        'hide ' + props.displaySwitcher + ' ' + props.label[1]
                                    :
                                        'display ' + props.displaySwitcher + ' ' + props.label[1]
                                }
                            </span>
                    }
                    
                </div>
                <ul>
                {
                    (filteredCollection.length === 0)
                    ?
                        <p className='no_item'>No {props.label[0]} here !</p>
                    :
                        filteredCollection
                        .sort(props.sortFunction)
                        .map((item,index) => (
                            (!item[props.displaySwitcher] || displayAlt)
                            &&
                            <li key={index} id={item.id} style={props.grid} className={(item[props.displaySwitcher])?'alt_li':''}>
                                {
                                    (props.displaySwitcher)
                                    ?
                                        (item[props.displaySwitcher])
                                        ?
                                            props.icons.icon2
                                        :
                                            props.icons.icon1
                                    :
                                        props.icons.icon1
                                }
                                {
                                    props.columns.map((column, index) => (
                                        (typeof column === "object")
                                        ?
                                            column
                                        :
                                            <span key={index}>{item[column]}</span>
                                    ))
                                }
                                <FormModal 
                                    mode='edit'
                                    label={props.label[0]}
                                    categories={(props.categories)?props.categories:''}
                                    item={item}
                                    editHandler={props.editHandler}  
                                />
                                <FormModal
                                    mode='delete'
                                    label={props.label[0]}
                                    categories={(props.categories)?props.categories:''}
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