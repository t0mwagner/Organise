import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Header, Footer, Title, Navigation, Content, Login} from '../components/'
import { AUTH_TOKEN } from '../constants'

import "./app.scss"

export const App = () => {

    /* Hooks */
    const [number, setNumber] = useState(0)
    const [logoutMessage, setLogoutMessage] = useState('')

    /* Handler */
    const numberHandler = (number) => {
        setNumber(number)
    }
    const logoutMessageHandler = (message => {
        setLogoutMessage(message)
    })

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
                            <Switch>
                                <Route exact path='/login'>
                                    <Login logoutMessage={logoutMessage} />
                                </Route>
                                <Route path='/'>
                                    <Redirect to='/login'/>
                                </Route>
                            </Switch>
                            :
                            <Fragment>
                                <Header logoutMessageHandler={logoutMessageHandler} />
                                    <div className="content">
                                        <div className="content__header">
                                            <Title number={number} />
                                            <Navigation />
                                        </div>
                                        <div className='content__main'>
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