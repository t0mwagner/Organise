import React from 'react'
import { NavLink } from "react-router-dom"
import "./Navigation.scss"

export const Navigation = () => (
    <div className="links">
        <NavLink className="links__link" to='/task/today' isActive={(_, { pathname }) => ["/", "/task/today"].includes(pathname)} activeClassName='links__link--selected'>Today</NavLink>
        <NavLink className="links__link" to='/task/all' activeClassName='links__link--selected'>All tasks</NavLink>
        <NavLink className="links__link" to='/project/all' activeClassName='links__link--selected'>All projects</NavLink>
    </div>
)