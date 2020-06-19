import React from 'react'
import "./Header.scss"
import { Modal } from '../../components'
import MicroModal from 'micromodal'
import { AUTH_TOKEN } from '../../constants'
import { createBrowserHistory } from 'history'

let history = createBrowserHistory()

export const Header = (props) => (
    <header className="header">
       <div className='header_content'>
            <nav>
                <div className="logo">
                    <i className="fas fa-tasks clickable" onClick={(e)=>{
                        history.push('/')
                        history.go(0)
                    }}></i>
                </div>
                <div className="app_title">
                    <h1>Todo List</h1>
                </div>
                <div className="logout">
                    <i className="fas fa-sign-out-alt" onClick={()=>{
                        MicroModal.show('modal-logout')
                    }}></i>
                </div>
            </nav>
        </div>
        <Modal title="Logout" id="modal-logout">
            <div id='logout-content'>
                <p>You are about to logout</p>
                <div id='logout-buttons'>
                    <button className='secondary-btn' onClick={e=>{
                        MicroModal.close('modal-logout')
                    }}>Cancel</button>
                    <button className='primary-btn' onClick={e=>{
                        localStorage.removeItem(AUTH_TOKEN)
                        MicroModal.close('modal-logout')
                        history.push('/')
                        history.go(0)
                    }}>Logout</button>
                </div>
            </div>
        </Modal>
    </header>
)