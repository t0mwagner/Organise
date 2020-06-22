import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectTitle } from '../../components'
import moment from 'moment'
import "./Title.scss"

export const Title = (props) => (
    <div className='page_title'>
        <Route exact path='/task/all'>
            <h1>All tasks</h1>
            <p>
                {
                    (props.number > 1)
                    ? props.number + ' active tasks'
                    : props.number + ' active task'
                }
            </p>
        </Route>
        <Route exact path={['/','/task/today']}>
            <h1>{moment().format('ddd').charAt(0).toUpperCase() + moment().format('dddd D MMMM YYYY').slice(1)}</h1>
            <p>
                {
                    (props.number > 1)
                    ? props.number + ' active tasks'
                    : props.number + ' active task'
                }
            </p>
        </Route>
        <Switch>
            <Route exact path='/project/all'>
                <h1>All projects</h1>
                <p>
                    {
                        (props.number > 1)
                        ? props.number + ' projects'
                        : props.number + ' project'
                    }
                </p>
            </Route>
            <Route exact path='/project/:id'>
                <ProjectTitle />
                <p>
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