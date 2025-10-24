import styles from './Card.module.css'

const Card = ({title, description, icon}) => {

return (
    <div className={styles['card']}>
        <div className={styles['card-icon']}>{icon}</div>
        <div className={styles['card-content']}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
)


}

export default Card