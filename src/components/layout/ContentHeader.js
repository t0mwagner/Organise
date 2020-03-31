import React from 'react';

export const ContentHeader = () => (
    <div className="content_header">
        <form action=''>
            <label htmlFor="input_task">Add a task</label><br/>
            <input type="text" id="input_task" placeholder="Get the toilet paper..." />
            <input type="submit" value="Add task" />
        </form>
    </div>
)