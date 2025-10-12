import styles from './Homepage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight , faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

function Homepage () {
    return (
        <div className={`container-sm ${styles.container}`}>
            <h1 className={styles.title}>Boas-Vindas ao 
                <span className={styles.descriptum}>Descriptum</span>
            </h1>
            
            <div className={styles.textContainer}>
                <p className={styles.mainText}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia adipisci est vitae placeat nobis corrupti omnis magni aspernatur autem tenetur.
                </p>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas numquam alias sed culpa perspiciatis natus quis voluptate, repudiandae at distinctio accusantium nisi architecto impedit voluptatibus. Fugit tempora dolore dignissimos nobis rerum modi aspernatur vero maiores expedita rem, nesciunt veritatis velit!
                </p>
            </div>

            <div className={styles.buttonsContainer}>
                {/* O outro botão virá aqui (precisa do componente de Botão) */}
                {/* Botão provisório */}
                <a href="" className={styles.startPorccessBtn}> 
                    Começar a Extrair 
                    <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/> 
                </a>
                <a href="" className={styles.userGuideBtn}>
                    Ver Guia de Uso
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.icon} />
                </a>
            </div>
        </div>
    )
}

export default Homepage