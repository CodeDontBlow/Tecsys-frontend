import styles from './Input.module.css'

const Input = ({placeholder = 'Digite o valor', label, id, type = 'text', value, onChange, labelFont = 'text-regular'}) => {
    
    return(
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.label} style={{font: `var(--${labelFont})`}}> 
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