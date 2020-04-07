import React from 'react'
import "./Title.css"

export const Title = (props) => (
    <div className='page_title'>
        <h1>{props.title}</h1>
        <p>{props.taskNumber} active task{(props.taskNumber>1)?'s':''}</p>
    </div>
)