import styles from './Card.module.css'

const Card = ({title, description, icon, horizontal=false}) => {

return (
    <div className={`${styles['card']} ${horizontal ? styles['card-horizontal'] : ''}`}>
        <div className={styles['card-icon']}>{icon}</div>
        <div className={styles['card-content']}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
)


}

export default Card