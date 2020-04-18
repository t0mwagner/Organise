import React from 'react'
import { FaTasks, FaUserAlt } from 'react-icons/fa'
import "./Header.css"

export const Header = () => (
    <header className="header">
       <div className='header_content'>
            <nav>
                <div className="logo">
                    <FaTasks />
                </div>
                <div className="app_title">
                    <h1>Todo List</h1>
                </div>
                <div className="login">
                    <FaUserAlt />
                </div>
            </nav>
        </div>
    </header>
)