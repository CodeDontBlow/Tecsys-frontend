import styles from './Navbar.module.css'
import logo from '../../assets/logos/Descriptum_Logo.svg'

const Navbar = () => {
    return(
        <nav className={`navbar navbar-expand-lg fixed-top px-1 py-0 ${styles.navbar}`}>
            <div class="container-xxl">
                <a class="navbar-brand" href="/">
                    <img src={logo} className={styles.logo}/>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Extrair Documento</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Banco de Dados</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Histórico de Extrações</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Guia de Uso</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar