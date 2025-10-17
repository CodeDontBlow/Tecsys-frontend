import styles from './Input.module.css'

const Input = ({placeholder, label, id, type = 'text'}) => {
    return(
        <div className={styles.container}>
            {label && (
                <label htmlFor={id}> 
                    {label}
                </label>
            )}

            <input
                type={type} 
                id={id && (id) }
                placeholder={placeholder && (placeholder)}
            />
        </div>
    )
}

export default Input