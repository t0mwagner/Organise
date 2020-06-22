import React from 'react'
import { NavLink } from "react-router-dom"
import "./Navigation.scss"

export const Navigation = () => (
    <div id="links">
        <NavLink to='/task/today' isActive={(_, { pathname }) => ["/", "/task/today"].includes(pathname)} activeClassName='selected_link'>Today</NavLink>
        <NavLink to='/task/all' activeClassName='selected_link'>All tasks</NavLink>
        <NavLink to='/project/all' activeClassName='selected_link'>All projects</NavLink>
    </div>
)