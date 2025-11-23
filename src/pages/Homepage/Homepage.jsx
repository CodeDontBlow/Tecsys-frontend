import styles from './Homepage.module.css'
import { faChevronRight , faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

function Homepage () {

    const navigate = useNavigate()

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
                <Button 
                    variant="filled" 
                    color="royal" 
                    size="medium"
                    icon={faChevronRight}
                    iconPosition="right"
                    className={styles.startProcessBtn}
                    onClick={() => {
                        navigate('/input-files')
                    }}
                >
                    Começar a Extrair
                </Button>
                
                {/* <Button 
                    variant="outlined" 
                    color="gray" 
                    size="medium"
                    icon={faArrowUpRightFromSquare}
                    iconPosition="right"
                    className={styles.userGuideBtn}
                >
                    Ver Guia de Uso
                </Button> */}
            </div>
        </div>
    )
}

export default Homepage