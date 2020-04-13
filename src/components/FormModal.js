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
        if (mode === 'edit')
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
                (props.mode === 'add') 
                ?<button className='add_btn' onClick={() => openModal('add')}>add {props.label}</button>
                :(props.mode === 'edit')
                ?<FaEdit className='edit_btn' onClick={() => openModal('edit')} />
                :(props.mode === 'delete')
                ?<FaTrashAlt className='delete_btn' onClick={()=> openModal('delete')} />
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
                        (props.mode==='delete')
                        ?
                            <p className='delete_alert'>
                                You are about to delete :<br/><br/>
                                <strong>{props.item.label}</strong>
                            </p>
                        :
                            (props.label==='task')
                            ? <TaskForm item={props.item} date={date} categories={props.categories} changeDate={handleChangeDate} />
                            : <CategoryForm item={props.item} />
                    }
                    <button id="submit_btn" type="submit" onClick={(e)=>
                    {
                        e.preventDefault()
                        if (props.mode==='delete'){
                            props.deleteHandler(props.item.id)
                            closeModal()
                        } 
                        else  if (checkRequired(e))
                        {
                            (props.mode === 'add')?props.addHandler():props.editHandler(props.item.id)
                            closeModal()
                        }
                    }}>
                    {
                        props.mode.charAt(0).toUpperCase() + props.mode.slice(1) + ' ' + props.label
                    }
                    </button>
                </form>
            </Modal>
        </div>
    )
}