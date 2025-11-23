import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/logos/Descriptum_Logo.svg'

const Navbar = () => {
    return(
        <nav className={`navbar navbar-expand-lg fixed-top px-1 py-0 ${styles.navbar}`}>
            <div className="container-xxl">
                <Link className="navbar-brand" to="/">
                    <img src={logo} className={styles.logo}/>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/input-files">Extrair Documento</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/database">Banco de Dados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/database/history">Histórico de Extrações</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="#">Guia de Uso</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar