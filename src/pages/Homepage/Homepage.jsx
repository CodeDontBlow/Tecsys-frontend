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
                    Automatize o processo de registro aduaneiro e transforme pedidos de compra em informações organizadas e prontas para análise!
                </p>
                <p className={styles.text}>
                    O <b>Descriptum</b> identifica automaticamente cada produto, pesquisando dados de origem, fabricante e fornecedor, além de o associar aos principais NCM's correspondentes. Envie o <abbr title="Portable Document Format">PDF</abbr> do pedido e acompanhe a geração das descrições completas, revisando e ajustando detalhes conforme necessário.
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