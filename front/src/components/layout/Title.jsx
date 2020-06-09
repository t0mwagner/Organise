import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectTitle } from '../../components'
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
        <Switch>
            <Route exact path='/project/all'>
                <h1>Tous les projets</h1>
                <p>
                    {
                        (props.number > 1)
                        ? props.number + ' projets'
                        : props.number + ' projet'
                    }
                </p>
            </Route>
            <Route exact path='/project/:id'>
                <ProjectTitle />
                <p>
                    {
                        (props.number > 1)
                        ? props.number + ' tâches actives'
                        : props.number + ' tâche active'
                    }
                </p>
            </Route>
        </Switch>
    </div>
)