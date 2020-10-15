import React, { Fragment } from 'react'
import { TaskList, ProjectList, TasksByProject } from '../../components'
import { Route, Switch, Redirect } from 'react-router-dom'
import moment from 'moment'

export const Content = (props) => (
    <Switch>
        <Route exact path='/task/all'>
            <TaskList 
                filter={{}}
                numberHandler={props.numberHandler}
            />
        </Route>
        <Route exact path={['/','/task/today']}>
            <TaskList
                filter={{dueDate:moment().endOf('day')}}
                numberHandler={props.numberHandler}
            />
        </Route>
        <Route exact path='/project/all'>
            <ProjectList
                numberHandler={props.numberHandler}
            />
        </Route>
        <Route exact path='/project/:id'>
            <TasksByProject
                numberHandler={props.numberHandler}
            />
        </Route>
        <Route path='/'>
            <Redirect to='/task/today' />
        </Route>
    </Switch>
)