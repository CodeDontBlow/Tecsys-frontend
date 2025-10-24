import styles from './Checklist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button.jsx';

const defaultProcessData = {
    currentItem: 1,        
    totalItems: 10,
    currentStep: 2,
}

const renderIcon = (status) => {
    switch (status) {
        case "completed":
            return <FontAwesomeIcon icon={faCheckCircle} className={styles.completed} />;
        default:
            return <FontAwesomeIcon icon={faClock} />;
    }
}

//Definição dos passos do checklist
const steps = [
    { id: 0, name: "Coletando Informações", status: "pending" },
    { id: 1, name: "Pesquisando PN", status: "pending" },
    { id: 2, name: "Pesquisando Fabricante", status: "pending" },
    { id: 3, name: "Estimando NCM", status: "pending" },
    { id: 4, name: "Gerando Descrição", status: "pending" },
]

//Determina qual o status do passo atual
const getStepStatus = (stepIndex, currentStep) => {
    if (stepIndex < currentStep) return "completed";    
    if (stepIndex === currentStep) return "in-progress"; 
    return "pending";                                    
}

//Formatar o contador para exibição com dois dígitos
const formatCount = (currentItem, totalItems) => {
    return `${currentItem.toString().padStart(2, '0')}/${totalItems}`;
}

const Checklist = ({processData = defaultProcessData}) => {
    const { currentItem, totalItems, currentStep } = processData;

    return (
        <div className={styles['checklist-container']}>
            <h1>Produtos Extraídos</h1>
            <p className={styles['checklist-count']}>
                {formatCount(currentItem, totalItems)}
            </p>
            <ul>
                {steps.map((step, index) => {
                    const status = getStepStatus(index, currentStep);
                    return (
                        <li key={step.id}>
                            <span className={styles['checklist-icon']}>{renderIcon(status)}</span>
                            <span className={`${styles['checklist-text']} ${status === 'completed' ? styles.completed : ''}`}>{step.name}</span>
                        </li>
                    );
                })}
            </ul>
            <Button variant="filled" color="royal" fullWidth={true}>Visualizar Resultados</Button>
        </div>
    )
}


export default Checklist;