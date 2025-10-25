import { useState } from 'react'
import styles from './InputFiles.module.css'
import DragDrop from '../../components/DragDrop/DragDrop'
import StepMap from '../../components/StepMap/StepMap'
import Checklist from '../../components/Checklist/Checklist'

function InputFiles() {
    const [isFileUploaded, setIsFileUploaded] = useState(false)

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <StepMap />
            </header>

            <main
                className={`${styles.main} ${isFileUploaded ? styles.mainUploaded : ''}`}                
            >

                <div className={styles.right}>
                    <DragDrop setIsFileUploaded={setIsFileUploaded} isFileUploaded={isFileUploaded} />
                </div>

                <div className={styles.left}>
                    {isFileUploaded && <Checklist />}
                </div>

            </main>
        </div>
    )
}

export default InputFiles
