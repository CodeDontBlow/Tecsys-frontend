import styles from './Input.module.css'

const Input = ({placeholder, label, id, type = 'text'}) => {
    
    return(
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.label}> 
                    {label}
                </label>
            )}

            <input
                type={type} 
                id={id && (id) }
                placeholder={placeholder && (placeholder)}
                className={styles.input}
            />
        </div>
    )
}

export default Input