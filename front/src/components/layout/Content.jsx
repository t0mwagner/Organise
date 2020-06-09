import React from 'react'
import { TaskList, ProjectList } from '../../components'
import { Route } from 'react-router-dom'
import moment from 'moment'

import "./Content.scss"

export const Content = (props) => (
    <div id="content_main">
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
    </div>
)