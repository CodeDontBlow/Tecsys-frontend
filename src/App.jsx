import './App.css'
import { useState } from 'react'
import RoutesApp from './routes'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App() {

    return (
        <>
        <Navbar/>
        <section className="container-xxl">
            <RoutesApp/>
        </section>
        <Footer/>
        </>
    )
}

export default App
