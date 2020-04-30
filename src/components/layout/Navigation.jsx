import React from 'react'
import { NavLink } from "react-router-dom"
import "./Navigation.scss"

export const Navigation = () => (
    <div id="links">
        <NavLink to='/task/all' activeClassName='selected_link'>Toutes les tâches</NavLink>
        <NavLink to='/task/today' activeClassName='selected_link'>Aujourd'hui</NavLink>
        <NavLink to='/category/all' activeClassName='selected_link'>Catégories</NavLink>
    </div>
)