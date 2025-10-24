import styles from './DataBase.module.css';
import Card from '../../components/Card/Card';

function DataBase() {
    return (

        <div className={`container-sm ${styles.container}`}>
            <h1>Banco de Dados</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices velit dapibus sapien semper, et ornare tellus interdum, et ornare tellus interdum.</p>
            <div className={`${styles.cardArea}`}>
                <Card icon={''} title={"Produtos"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}></Card>
                <Card icon={''} title={"Fornecedores"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}></Card>
                <Card icon={''} title={"Fabricantes"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}></Card>
            </div>
        </div>

)
}

export default DataBase;