import './App.css'
import { useState } from 'react'
import RoutesApp from './routes'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import StepMap from './components/StepMap/StepMap'

function App() {

    return (
        <>
        <Navbar/>
        <section className="container-xxl" id='contentContainer'>
            <RoutesApp/>
        </section>
        <StepMap currentStep={2}></StepMap>
        <Footer/>
        </>
    )
}

export default App
