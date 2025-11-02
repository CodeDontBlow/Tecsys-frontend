import styles from './DataBase.module.css';
import Card from '../../components/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faTruck, faIndustry, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons';

function DataBase() {
    return (

        <div className={`container-sm ${styles.container}`}>
            <h1>Banco de Dados</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices velit dapibus sapien semper, et ornare tellus interdum, et ornar e tellus interdum.</p>
            <div className={`${styles.cardArea}`}>
                <Card 
                    icon={<FontAwesomeIcon icon={faClockRotateLeft}/>} 
                    title="Histórico de Extrações" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
                    horizontal={true}>
                </Card>

                <Card 
                    icon={<FontAwesomeIcon icon={faDolly}/>} title="Produtos" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit">
                </Card>

                <Card 
                    icon={<FontAwesomeIcon icon={faTruck}/>} 
                    title="Fornecedores" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
                </Card>

                <Card 
                    icon={<FontAwesomeIcon icon={faIndustry}/>} 
                    title="Fabricantes" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
                </Card>
            </div>
        </div>
    )
}

export default DataBase;