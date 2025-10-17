import styles from './Checklist.module.css';
import { faClock } from '@fortawesome/free-solid-svg-icons'


const Checklist = ({icon}) => {
    return (
        <div className={styles['checklist-container']}>
            <h1>Produtos Extraídos</h1>
            <p className={styles['checklist-count']}>0/10</p>
            <ul className={styles['checklist']}>
                <li>
                    <span className={styles['checklist-icon']}>{icon}</span>
                    <span className={styles['checklist-text']}>{"Coletando Informações"}</span>
                </li>
                <li>
                    <span className={styles['checklist-icon']}>{icon}</span>
                    <span className={styles['checklist-text']}>{"Pesquisando PN"}</span>
                </li>
                <li>
                    <span className={styles['checklist-icon']}>{icon}</span>
                    <span className={styles['checklist-text']}>{"Pesquisando Fabricante"}</span>
                </li>
                <li>
                    <span className={styles['checklist-icon']}>{icon}</span>
                    <span className={styles['checklist-text']}>{"Estimando NCM"}</span>
                </li>
                <li>
                    <span className={styles['checklist-icon']}>{icon}</span>
                    <span className={styles['checklist-text']}>{"Gerando Descrição"}</span>
                </li>
            </ul>
        </div>
    )
}


export default Checklist;