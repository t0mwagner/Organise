import React from 'react'
import { TaskList, CategoryList } from '../../components'
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
                filter={{date:moment().endOf('day')}}
                numberHandler={props.numberHandler}
            />
        </Route>
        <Route exact path='/category/all'>
            <CategoryList
                numberHandler={props.numberHandler}
            />
        </Route>
    </div>
)