import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
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
                mode='ajouter'
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
                                    (!displayAlt)
                                    ?
                                        'Afficher les ' + props.label[1] + ' ' + props.displaySwitcher[1]                                 :
                                        'Masquer les ' + props.label[1] + ' ' + props.displaySwitcher[1]
                                }
                            </span>
                    }
                    
                </div>
                <ul>
                {
                    (filteredCollection.length === 0)
                    ?
                        <p className='no_item'>Aucune {props.label[0]} !</p>
                    :
                        filteredCollection
                        .sort(props.sortFunction)
                        .map((item,index) => (
                            (!item[props.displaySwitcher[0]] || displayAlt)
                            &&
                            <li key={index} id={item.id} style={props.grid} className={(item[props.displaySwitcher[0]])?'alt_li':''}>
                                {
                                    (props.displaySwitcher)
                                    ?
                                        (item[props.displaySwitcher[0]])
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
                                            column.columnHandler(column.columnProp.map(attr=>item[attr]))
                                        :
                                            <span className='column' key={index}>{item[column]}</span>
                                    ))
                                }
                                <FormModal 
                                    mode='modifier'
                                    label={props.label[0]}
                                    categories={(props.categories)?props.categories:''}
                                    item={item}
                                    editHandler={props.editHandler}  
                                />
                                {
                                    (filteredCollection.length === 1 && props.noEmpty === true)
                                    ?
                                    <span class='btn_disabled'>
                                        <FaTrashAlt className='delete_btn_disabled' />
                                    </span>
                                    :
                                        <FormModal
                                            mode='supprimer'
                                            label={props.label[0]}
                                            categories={(props.categories)?props.categories:''}
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