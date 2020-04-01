import React from 'react'
import "./AddForm.css"

export const AddForm = (props) => (
    <div className="add_form">
        <form action=''>
            <label htmlFor="input_task">Add a task</label><br/>
            <input type="text" id="input_task" placeholder="Get the toilet paper..." />
            <input type="submit" value="Add task" onClick={props.addTask} />
        </form>
    </div>
)