import React, { useState } from 'react'
import Modal from 'react-modal'
import DatePicker from "react-datepicker"
import { FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa"

import "react-datepicker/dist/react-datepicker.css"
import "./TaskForm.css"

Modal.setAppElement('#root')

export const TaskForm = (props) => {

    const [date, setDate] = useState(new Date())
    const [modalIsOpen,setIsOpen] = useState(false)

    const openModal = (mode) => {
        if (mode === 'edit')
        {
            setDate(new Date(props.task.date))
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

    return (
        <div className='task_btns'>
            {
                (props.mode === 'add') 
                ?<button className='add_task_btn' onClick={() => openModal('add')}>New task</button>
                :(props.mode === 'edit')
                ?<FaEdit className='edit_icon' onClick={() => openModal('edit')} />
                :(props.mode === 'delete')
                ?<FaTrashAlt className='delete_icon' onClick={()=> openModal('delete')} />
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
                            props.mode.charAt(0).toUpperCase() + props.mode.slice(1) + ' Task'
                        }
                        </h2> 
                        <FaTimes className='modal_close_icon' onClick={closeModal}/>
                    </span>
                    {
                        (props.mode==='delete')
                        ?
                            <p className='delete_alert'>
                                You are about to delete :<br/><br/>
                                <strong>{props.task.label}</strong>
                            </p>
                        :
                            <span className="task_fields">
                                <label htmlFor="input_task">* Title</label>
                                <input type="text" id="input_task" maxLength='50' required defaultValue=
                                {
                                    (props.task)&&props.task.label
                                }
                                />
                                <label htmlFor="date_select">* Due date</label>
                                <DatePicker 
                                    id="date_select"
                                    selected={date}
                                    showTimeSelect 
                                    timeIntervals={15}
                                    timeFormat="HH:mm"
                                    onChange={handleChangeDate}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    required  
                                />
                            </span>
                    }
                    <button id="submit_btn" type="submit" onClick={(e)=>
                    {
                        e.preventDefault()
                        if (props.mode==='delete'){
                            props.deleteTask(props.task.id)
                            closeModal()
                        } 
                        else  if (document.getElementById('input_task').value !== '' 
                        && document.getElementById('date_select').value !== '')
                        {
                            (props.mode === 'add')?props.addTask():props.editTask(props.task.id)
                            closeModal()
                        }
                    }}>
                    {
                        props.mode.charAt(0).toUpperCase() + props.mode.slice(1) + ' Task'
                    }
                    </button>
                </form>
            </Modal>
        </div>
    )
}