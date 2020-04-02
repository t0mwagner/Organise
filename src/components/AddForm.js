import React from 'react'
import "./AddForm.css"

export const AddForm = (props) => (
    <div className="add_form">
        <form action=''>
            <input type="text" id="input_task" placeholder="Do the laundry..." />
            <button type="submit" onClick={props.addTask}>Add task</button>
        </form>
    </div>
)