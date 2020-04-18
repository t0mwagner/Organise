import React, { useState } from 'react'
import Modal from 'react-modal'
import { TaskForm } from './TaskForm'
import { CategoryForm } from './CategoryForm'
import { FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa"

import "react-datepicker/dist/react-datepicker.css"
import "./FormModal.css"

Modal.setAppElement('#root')

export const FormModal = (props) => {

    const [date, setDate] = useState(new Date())
    const [modalIsOpen,setIsOpen] = useState(false)

    const openModal = (mode) => {
        if (mode === 'modifier')
        {
            setDate(new Date(props.item.date))
        } else {
            setDate(new Date())
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleChangeDate = date => {
        setDate(date)
    }

    const checkRequired = (e) => {
        let result = true

        for (let field of e.target.parentNode)
        {
            if (field.hasAttribute('required') && field.value === '')
            {
                result = false
            }
        }
        return result
    }

    return (
        <div className='list_buttons'>
            {
                (props.mode === 'ajouter') 
                ?<button className='add_btn' onClick={() => openModal('ajouter')}>Nouvelle {props.label}</button>
                :(props.mode === 'modifier')
                ?<FaEdit className='edit_btn' onClick={() => openModal('modifier')} />
                :(props.mode === 'supprimer')
                ?<FaTrashAlt className='delete_btn' onClick={()=> openModal('supprimer')} />
                :''
            }
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='modal'
                overlayClassName='modal_overlay'
            >
                <form>
                    <span className='modal_title'>
                        <h2>
                        {
                            props.mode.charAt(0).toUpperCase() + props.mode.slice(1) + ' ' + props.label
                        }
                        </h2> 
                        <FaTimes className='modal_close_icon' onClick={closeModal}/>
                    </span>
                    {
                        (props.mode==='supprimer')
                        ?
                            <p className='delete_alert'>
                                Vous allez supprimer :<br/><br/>
                                <strong>{props.item.label}</strong>
                            </p>
                        :
                            (props.label==='tâche')
                            ? <TaskForm item={props.item} date={date} categories={props.categories} changeDate={handleChangeDate} />
                            : <CategoryForm item={props.item} />
                    }
                    <button id="submit_btn" type="submit" onClick={(e)=>
                    {
                        e.preventDefault()
                        if (props.mode==='supprimer'){
                            props.deleteHandler(props.item.id)
                            closeModal()
                        } 
                        else  if (checkRequired(e))
                        {
                            (props.mode === 'ajouter')?props.addHandler():props.editHandler(props.item.id)
                            closeModal()
                        }
                    }}>
                    {
                        props.mode.charAt(0).toUpperCase() + props.mode.slice(1)
                    }
                    </button>
                </form>
            </Modal>
        </div>
    )
}