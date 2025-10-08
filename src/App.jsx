import './App.css'
import { useState } from 'react'
import RoutesApp from './routes'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App() {

    return (
        <>
        <Navbar/>
        <RoutesApp />
        <Footer/>
        </>
    )
}

export default App
