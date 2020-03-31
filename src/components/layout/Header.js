import React from 'react';

export const Header = () => (
    <header className="header">
        <nav>
            <div className="logo">
                <img src="./img/logo.svg" alt="todo logo" />
            </div>
            <div className="title">
                <h1>Todo List</h1>
            </div>
            <div className="login">
                <a href="#">
                    <img src="./img/login_btn.svg" alt="login button" />
                </a>
            </div>
        </nav>
    </header>
)