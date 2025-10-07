import styles from './Footer.module.css'

const Footer = () => {
    return(
        <footer id={styles.footer}>
            <div className="container-xxl">
                <div className={styles.containerTecsys}>
                    <a href="">TecSys Website</a>
                </div>
                
                <div className={styles.containerCDB}>
                    <span>Desenvolvido por </span>
                    <a href="https://github.com/codedontblow" target='_blank'>Code Don't Blow</a>
                </div>
            </div>
        </footer>
    )   
}

export default Footer