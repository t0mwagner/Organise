import React from 'react'
import "./Title.css"

export const Title = (props) => (
    <div className='page_title'>
        <h1>{props.title}</h1>
        <p>
            {
                (props.number > 1)
                ? props.number + ' active ' + props.type[1]
                : props.number + ' active ' + props.type[0]
            }
        </p>
    </div>
)