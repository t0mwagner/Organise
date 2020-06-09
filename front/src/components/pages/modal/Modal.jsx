import React from 'react'

import './Modal.scss'

export const Modal = (props) => {

    return (
        <div className="modal micromodal-slide" id={props.id} aria-hidden="true">
            <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
                <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby={props.id+"-title"} >
                    <header className="modal__header">
                        <h2 className="modal__title" id={props.id+"-title"}>
                         {props.title}
                        </h2>
                        <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
                    </header>
                    <div className="modal__content" id={props.id+"-content"}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}