import React from 'react'
import { Header } from './components/layout/Header'
import { Content } from './components/layout/Content'
import { Footer } from './components/layout/Footer'

export const App = () => (
  <div className="app">
    <Header />
    <Content />
    <Footer />
  </div>
)