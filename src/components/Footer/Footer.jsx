import styles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return(
        <footer id={styles.footer}>
            <div className="container-xxl">
                <div className={styles.containerTecsys}>
                    <a href="https://www.tecsysbrasil.com.br/" target='_blank'><img src='src/assets/logos/Tecsys_LogoW.svg' width="25rem"></img>TecSys Website</a>
                </div>
                
                <div className={styles.containerCDB}>
                    <span>Desenvolvido por </span>
                    <a href="https://github.com/codedontblow" target='_blank'>
                        <FontAwesomeIcon icon={faGithub} className={styles.icon}/>
                        Code Don't Blow
                    </a>
                </div>
            </div>
        </footer>
    )   
}

export default Footer