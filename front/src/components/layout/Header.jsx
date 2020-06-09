import React from 'react'
import "./Header.scss"

export const Header = () => (
    <header className="header">
       <div className='header_content'>
            <nav>
                <div className="logo">
                    <i className="fas fa-tasks"></i>
                </div>
                <div className="app_title">
                    <h1>Todo List</h1>
                </div>
                <div className="login">
                    <i className="fas fa-sign-in-alt"></i>
                </div>
            </nav>
        </div>
    </header>
)