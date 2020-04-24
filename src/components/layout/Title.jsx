import React from 'react'
import "./Title.scss"

export const Title = (props) => (
    <div className='page_title'>
        <h1>{props.title}</h1>
        <p>
            {
                (props.number > 1)
                ? props.number + ' ' + props.type[1] + ' actives'
                : props.number + ' ' + props.type[0] + ' active'
            }
        </p>
    </div>
)