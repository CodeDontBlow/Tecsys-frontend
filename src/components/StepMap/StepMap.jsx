import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import styles from './StepMap.module.css'

const steps = [
    { 
        label: 'Carregar Pedido', 
        step: 1 
    },
    { 
        label: 'Processar Pedido', 
        step: 2 
    },
    { 
        label: 'Editar Resultados', 
        step: 3 
    }
]


const StepMap = ({currentStep = 1}) => {
    
    // Função para determinar o status de cada step
    const getStepStatus = (stepNumber) => {
      if (currentStep > steps.length) {
        return 'completed'
      }
        if (stepNumber < currentStep) return 'completed'  // Steps anteriores = feitos
        if (stepNumber === currentStep) return 'in-progress'  // Step atual = fazendo
        return 'pending'  // Steps futuros = a fazer
    }

    const renderStepContent = (stepNumber, status) => {
        switch (status) {
            case 'completed':
                return <span className={styles['step-map-check']}><FontAwesomeIcon icon={faCircleCheck} /></span>
            case 'in-progress':
                return <span className={styles['step-map-load']}><FontAwesomeIcon icon={faArrowRotateRight} /></span>
            default: // 'pending'
                return <span className={styles['step-map-count']}>{stepNumber}</span>
        }
    }

    const getProgressWidth = () => {
        if (currentStep <= 1) return '0%'
        if (currentStep > steps.length) return '100%'  // Processo totalmente completo
        return `${((currentStep - 1) / (steps.length - 1)) * 100}%`
    }

    return (
        <div className={styles['step-map']}>
            <div className={styles["step-map-container"]}>
                {steps.map(({label, step }) => {
                    const status = getStepStatus(step)
                    return ( 
                        <div className={styles['step-map-item']} key={step}>
                            <div className={styles["step-map-label-container"]}>
                                <div className={styles["step-map-label"]}>{label}</div>
                            </div>
                            <div className={styles["step-map-circle"]}>
                                {renderStepContent(step, status)}
                            </div>
                        </div>
                    )
                })}
                <div className={styles['step-map-filled-line']} style={{ width: getProgressWidth() }}></div>
            </div>
        </div>
    )
}

export default StepMap