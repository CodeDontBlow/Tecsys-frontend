import styles from './Checklist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCheckCircle, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button.jsx';
import { useEffect, useState } from 'react';
import { disconnectWebSocket } from '../../services/websocket.js';
import { useNavigate } from 'react-router-dom';

const renderIcon = (status) => {
    switch (status) {
        case "completed":
            return <FontAwesomeIcon icon={faCheckCircle} className={styles.completed} />;
        case "in-progress":
            return <FontAwesomeIcon icon={faArrowRotateRight} className={styles.icon_load}/>;
        default:
            return <FontAwesomeIcon icon={faClock} />;
    }
}

//Definição dos passos do checklist
const steps = [
    { id: 0, name: "Coletando Informações", process: "pdf_extraction", status: "pending" },
    { id: 1, name: "Pesquisando PN", process: "web_scrapping", status: "pending" },
    { id: 2, name: "Pesquisando Fabricante", process: "web_scrapping", status: "pending" },
    { id: 3, name: "Estimando NCM", process: "get_ncms", status: "pending" },
    { id: 4, name: "Gerando Descrição", process: "description_generate", status: "pending" },
]

const getStepStatus = (stepIndex, currentStep) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "in-progress";
    return "pending";
}

const Checklist = ({ wsMessages }) => {
    const [calculatedCurrentStep, setCalculatedCurrentStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let latestCompletedStepIndex = -1;
        let pipelineOverallFinished = false;

        steps.forEach((step, index) => {

            const wsMessage = wsMessages.find(msg => msg.process === step.process);

            if (wsMessage && wsMessage.status === 'success') {
                latestCompletedStepIndex = index;
            }
        });

        const overallMessage = wsMessages.find(msg => msg.process === 'pipeline_overall');
        if (overallMessage && overallMessage.status === 'finished') {
            pipelineOverallFinished = true;
            disconnectWebSocket();
        }

        setCalculatedCurrentStep(latestCompletedStepIndex + 1);
        setIsFinished(pipelineOverallFinished);
    }, [wsMessages]); 

    return (
        <div className={styles['checklist-container']}>
            <h1>Produtos Extraídos</h1>
            <ul>
                {steps.map((step, index) => {
                    const status = getStepStatus(index, calculatedCurrentStep);
                    return (
                        <li key={step.id}>
                            <span className={styles['checklist-icon']}>{renderIcon(status)}</span>
                            <span className={`${styles['checklist-text']} ${status === 'completed' ? styles.completed : ''}`}>{step.name}</span>
                        </li>
                    );
                })}
            </ul>
            <Button variant="filled" color="royal" fullWidth={true} disabled={!isFinished} onClick={() => { navigate("/table-editing") }}>Visualizar Resultados</Button>
        </div>
    )
}


export default Checklist;