import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectTitle } from '../../components'
import moment from 'moment'
import "./Title.scss"

export const Title = (props) => (
    <div className='page-title'>
        <Route exact path='/task/all'>
            <h1 className="page-title__title">All tasks</h1>
            <p className="page-title__subtitle">
                {
                    (props.number > 1)
                    ? props.number + ' active tasks'
                    : props.number + ' active task'
                }
            </p>
        </Route>
        <Route exact path={['/','/task/today']}>
            <h1 className="page-title__title">{moment().format('ddd').charAt(0).toUpperCase() + moment().format('dddd D MMMM YYYY').slice(1)}</h1>
            <p className="page-title__subtitle">
                {
                    (props.number > 1)
                    ? props.number + ' active tasks'
                    : props.number + ' active task'
                }
            </p>
        </Route>
        <Switch>
            <Route exact path='/project/all'>
                <h1 className="page-title__title">All projects</h1>
                <p className="page-title__subtitle">
                    {
                        (props.number > 1)
                        ? props.number + ' projects'
                        : props.number + ' project'
                    }
                </p>
            </Route>
            <Route exact path='/project/:id'>
                <ProjectTitle />
                <p className="page-title__subtitle">
                    {
                        (props.number > 1)
                        ? props.number + ' active tasks'
                        : props.number + ' active task'
                    }
                </p>
            </Route>
        </Switch>
    </div>
)