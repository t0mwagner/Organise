import React from 'react'
import { NavLink } from "react-router-dom"
import "./Navigation.scss"

export const Navigation = () => (
    <div id="links">
        <NavLink to='/task/all' activeClassName='selected_link'>Toutes les tâches</NavLink>
        <NavLink to='/task/today' isActive={(_, { pathname }) => ["/", "/task/today"].includes(pathname)} activeClassName='selected_link'>Aujourd'hui</NavLink>
        <NavLink to='/project/all' activeClassName='selected_link'>Projets</NavLink>
    </div>
)