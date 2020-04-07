import React, { useState } from 'react'
import Modal from 'react-modal'
import DatePicker from "react-datepicker"
import { FaTimes, FaEdit } from "react-icons/fa"

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
        <div>
            {
                (props.mode === 'add')
                ?<button className='add_task_btn' onClick={() => openModal('add')}>New task</button>
                :<FaEdit className='edit_icon' onClick={() => openModal('edit')} />
            }
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='modal_add'
                overlayClassName='modal_add_overlay'
            >
                <form>
                    <span className='modal_title'>
                        <h2>
                        {
                            (props.mode === 'add')
                            ?'New task'
                            :'Edit task'
                        }
                        </h2> 
                        <FaTimes className='modal_close_icon' onClick={closeModal}/>
                    </span>
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
                    <button id="submit_btn" type="submit" onClick={(e)=>{
                        e.preventDefault()
                        if (document.getElementById('input_task').value !== '' 
                        && document.getElementById('date_select').value !== '')
                        {
                            (props.mode === 'add')?props.addTask():props.editTask(props.task.id)
                            closeModal()
                        }
                    }}>
                    {
                        (props.mode === 'add')
                        ?'New task'
                        :'Edit task'
                    }
                    </button>
                </form>
            </Modal>
        </div>
    )
}