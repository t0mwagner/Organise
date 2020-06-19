import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Header, Footer, Title, Navigation, Content, Login} from '../components/'
import { AUTH_TOKEN } from '../constants'

import "./app.scss"

export const App = () => {

    /* Hooks */
    const [number, setNumber] = useState(0)

    /* Handler */
    const numberHandler = (number) => {
        setNumber(number)
    }

    /* Authentication */
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path='/'>
                        {
                            !authToken
                            ?
                            <Fragment>
                                <Route exact path='/login' component={Login} />
                                <Redirect to='/login'/>
                            </Fragment>
                            :
                            <Fragment>
                                <Header />
                                    <div id="content">
                                        <div id="content_header">
                                            <Title number={number} />
                                            <Navigation />
                                        </div>
                                        <div id='content_main'>
                                            <Content numberHandler={numberHandler} />
                                        </div>
                                    </div>
                                <Footer />
                            </Fragment>
                        }
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}