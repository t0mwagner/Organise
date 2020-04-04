import React from 'react'
import "./Header.css"

export const Header = () => (
    <header className="header">
        <nav>
            <div className="logo">
                <img src={process.env.PUBLIC_URL + '/img/logo.svg'} alt="todo logo" />
            </div>
            <div className="app_title">
                <h1>Todo List</h1>
            </div>
            <div className="login">
                <a href="#">
                    <img src={process.env.PUBLIC_URL + '/img/login_btn.svg'} alt="login button" />
                </a>
            </div>
        </nav>
    </header>
)