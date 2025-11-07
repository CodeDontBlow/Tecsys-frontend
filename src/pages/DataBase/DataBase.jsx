import { useNavigate } from 'react-router-dom';

import styles from './DataBase.module.css';
import Card from '../../components/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faTruck, faIndustry, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons';

function DataBase() {
    const navigate = useNavigate();

    const handleCardClick = (link) => {
        navigate(link);
    };

    return (
        <div className={`container-sm ${styles.container}`}>
            <h1>Banco de Dados</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices velit dapibus sapien semper, et ornare tellus interdum, et ornar e tellus interdum.</p>
            <div className={`${styles.cardArea}`}>
                <Card 
                    onClick={() => handleCardClick('/')}
                    icon={<FontAwesomeIcon icon={faClockRotateLeft}/>} 
                    title="Histórico de Extrações" 
                    description="Clique aqui para exibir o histórico de extrações de dados anteriores." 
                    horizontal={true}>
                </Card>
                <Card 
                    icon={<FontAwesomeIcon icon={faDolly}/>} title="Produtos" 
                    description="Clique aqui para exibir a lista de produtos.">
                </Card>
                <Card 
                    icon={<FontAwesomeIcon icon={faTruck}/>} 
                    title="Fornecedores" description="Clique aqui para exibir a lista de fornecedores.">
                </Card>

                <Card 
                    icon={<FontAwesomeIcon icon={faIndustry}/>} 
                    title="Fabricantes" description="Clique aqui para exibir a lista de fabricantes.">
                </Card>
            </div>
        </div>
    )
}

export default DataBase;