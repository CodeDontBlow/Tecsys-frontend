import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App() {

    return (        
        <BrowserRouter> 
            <Navbar/>
            <section className="container-xxl" id='contentContainer'>
                <RoutesApp/>
            </section>
            <Footer/>
        </BrowserRouter> 
    )
}

export default App
