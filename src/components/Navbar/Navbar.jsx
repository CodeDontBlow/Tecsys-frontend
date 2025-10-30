import styles from './Navbar.module.css'
import logo from '../../assets/logos/Descriptum_Logo.svg'

const Navbar = () => {
    return(
        <nav className={`navbar navbar-expand-lg fixed-top px-1 py-0 ${styles.navbar}`}>
            <div className="container-xxl">
                <a className="navbar-brand" href="/">
                    <img src={logo} className={styles.logo}/>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="input-files">Extrair Documento</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="database">Banco de Dados</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Histórico de Extrações</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Guia de Uso</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar