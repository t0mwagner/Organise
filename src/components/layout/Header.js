import React from 'react'
import "./Header.css"

export const Header = () => (
    <header className="header">
       <div className='header_content'>
            <nav>
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + '/img/logo.svg'} alt="todo logo" />
                </div>
                <div className="app_title">
                    <h1>Todo List</h1>
                </div>
                <div className="login">
                    <span>
                        <img src={process.env.PUBLIC_URL + '/img/login_btn.svg'} alt="login button" />
                    </span>
                </div>
            </nav>
        </div>
    </header>
)