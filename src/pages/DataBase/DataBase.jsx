import styles from './DataBase.module.css';
import Card from '../../components/Card/Card';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faTruck, faIndustry, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons';

function DataBase() {
    const navigate = useNavigate();
    return (

        <div className={`container-sm ${styles.container}`}>
            <h1>Banco de Dados</h1>
            <p>Nesta página, você pode visualizar e editar os dados armazenados no banco, como produtos, fornecedores e fabricantes. Também disponibilizamos o histórico de extração e acompanhamento dessas informações.</p>
            <div className={`${styles.cardArea}`}>
                <Card 
                    icon={<FontAwesomeIcon icon={faClockRotateLeft}/>} 
                    title="Histórico de Extrações" 
                    description="Visualize o histórico completo das extrações" 
                    horizontal={true}
                    onClick={() => {
                        navigate('/database/history');
                    }}>
                </Card>

                <Card 
                    icon={<FontAwesomeIcon icon={faDolly}/>} title="Produtos" 
                    description="Explore e atualize o catálogo de produtos"
                    onClick={() => {
                        navigate('/database/product');
                    }}>
                </Card>

                <Card 
                    icon={<FontAwesomeIcon icon={faTruck}/>} 
                    title="Fornecedores" description="Gerencie as informações dos seus fornecedores"
                    onClick={() => {
                        navigate('/database/supplier');
                    }}>
                </Card>

                <Card 
                    icon={<FontAwesomeIcon icon={faIndustry}/>} 
                    title="Fabricantes" description="Controle e acompanhe os dados dos fabricantes"
                    onClick={() => {
                        navigate('/database/manufacturer');
                    }}>
                </Card>
            </div>
        </div>
    )
}

export default DataBase;