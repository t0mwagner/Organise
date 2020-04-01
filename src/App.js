import React from 'react'
import { Header } from './components/Header'
import { TaskContainer } from './components/TaskContainer'
import { Footer } from './components/Footer'
import "./App.css"

export const App = () => (
  <div className="app">
    <Header />
    <TaskContainer />
    <Footer />
  </div>
)