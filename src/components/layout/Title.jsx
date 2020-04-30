import React from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'
import "./Title.scss"

moment.locale('fr')

export const Title = (props) => (
    <div className='page_title'>
        <Route exact path='/task/all'>
            <h1>Toutes les tâches</h1>
            <p>
                {
                    (props.number > 1)
                    ? props.number + ' tâches actives'
                    : props.number + ' tâche active'
                }
            </p>
        </Route>
        <Route exact path={['/','/task/today']}>
            <h1>{moment().format('ddd').charAt(0).toUpperCase() + moment().format('dddd D MMMM YYYY').slice(1)}</h1>
            <p>
                {
                    (props.number > 1)
                    ? props.number + ' tâches actives'
                    : props.number + ' tâche active'
                }
            </p>
        </Route>
        <Route exact path='/category/all'>
            <h1>Toutes les catégories</h1>
            <p>
                {
                    (props.number > 1)
                    ? props.number + ' catégories actives'
                    : props.number + ' catégorie active'
                }
            </p>
        </Route>
    </div>
)