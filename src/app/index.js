import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header, Footer, Title, Navigation, Content} from '../components/'

import "./app.scss"

export const App = () => {

    /* Hooks */
    const [number, setNumber] = useState(0)

    /* Handler */
    const numberHandler = (number) => {
        setNumber(number)
    }

    return (
        <div className="app">
            <Router>
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
            </Router>
        </div>
    )
}