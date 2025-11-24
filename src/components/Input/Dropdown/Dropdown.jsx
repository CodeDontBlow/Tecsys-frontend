import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import inputStyles from '../Input/Input.module.css'
import styles from './Dropdown.module.css'

const Dropdown = ({ label, options, onChange, dataType }) => {
    // 'options' deve ser um array de opções do dropdown

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isActivated, setIsActivated] = useState(false)
    const isObj = dataType === 'object'

    return (
        <div className={inputStyles.container}>
            {label && (
                <label className={inputStyles.label}>
                    {label}
                </label>
            )}

            {Array.isArray(options) && options.length > 0 ? (
                <>
                    <button className={`${inputStyles.input} ${styles.input} ${isActivated && (styles.activated)}`} onClick={() => { setIsActivated(!isActivated) }} type='button'>
                        {
                            isObj ? (
                                options[currentIndex].valor + ' - ' + options[currentIndex].descricao
                            ) : (
                                options[currentIndex]
                            )
                        }
                        <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
                    </button>

                    <div className={styles.optionsContainer}>
                        {isActivated && (
                            <div className={styles.options}>
                                {options.map((option, i) => (
                                    <p
                                        className={styles.option}
                                        key={i}
                                        onClick={() => {
                                            onChange(option)
                                            setCurrentIndex(i); setIsActivated(false)
                                        }}
                                    >
                                        {isObj ? (
                                            option.valor + ' - ' + option.descricao
                                        ) : (
                                            option
                                        )}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )
                : (
                    <div>Opções deve ser um Array</div>
                )}

        </div>
    )
}

export default Dropdown