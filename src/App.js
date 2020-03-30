import React from 'react'
import { Header } from './components/layout/Header'

export const App = () => (
  <div className="App">
    <Header />
    <AddForm />
    <SideBar />
    <Content />
    <Footer />
  </div>
)