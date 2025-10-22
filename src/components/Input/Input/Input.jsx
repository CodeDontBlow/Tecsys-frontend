import styles from './Input.module.css'

const Input = ({placeholder = 'Digite o valor', label, id, type = 'text', value, onChange}) => {
    
    return(
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.label}> 
                    {label}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    type='textarea'
                    id={id && (id) }
                    placeholder={placeholder && (placeholder)}
                    className={styles.input}
                    value={value}
                    onChange={onChange} 
                ></textarea>
            ) : (
                <input
                    type={type} 
                    id={id && (id) }
                    placeholder={placeholder && (placeholder)}
                    className={styles.input}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

export default Input