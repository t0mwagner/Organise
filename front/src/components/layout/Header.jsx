import React from 'react'
import "./Header.scss"
import { Modal } from '../../components'
import MicroModal from 'micromodal'
import { AUTH_TOKEN, USER_NAME } from '../../constants'
import { useHistory } from 'react-router-dom'

export const Header = ({logoutMessageHandler}) => {
    
    const history = useHistory()
    const userName = localStorage.getItem(USER_NAME)

    return (
        <header className="header">
        <div className='header__frame'>
            <div className='header__content'>
                <div className="header__logo header__logo--clickable" onClick={(e)=>{
                        history.push('/')
                        history.go(0)
                    }}>
                    <i className="fas fa-tasks"></i>
                </div>
                <h1 className="header__title">Todo List</h1>
                <div className="logout">
                    <span className='logout__username'>{userName}</span>
                    <span className='logout__button'>
                    <i className="fas fa-sign-out-alt" onClick={()=>{
                        MicroModal.show('modal-logout')
                    }}></i></span>
                </div>
            </div>
            </div>
            <Modal title="Logout" id="modal-logout" className="modal-logout">
                <div id='logout-content' className="modal-logout__content">
                    <p>You are about to logout</p>
                    <div className='logout-buttons' className="modal-logout__buttons">
                        <button className='modal-logout__button modal-logout__button--secondary' onClick={e=>{
                            MicroModal.close('modal-logout')
                        }}>Cancel</button>
                        <button className='modal-logout__button modal-logout__button--primary' onClick={e=>{
                            localStorage.removeItem(AUTH_TOKEN)
                            localStorage.removeItem(USER_NAME)
                            logoutMessageHandler('You have been disconnected')
                            MicroModal.close('modal-logout')
                            history.push('/login')
                            history.go(0)
                        }}>Logout</button>
                    </div>
                </div>
            </Modal>
        </header>
    )
}