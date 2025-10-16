import styles from './Card.module.css'

const Card = ({title, description, icon}) => {

return (
    <div className={styles['card']}>
        <div className={styles['card-container']}>
            <div className={styles['card-icon']}>{icon}</div>
            <div><h3 className={styles['card-title']}>{title}</h3></div>
            <p className={styles['card-description']}>{description}</p>
        </div>
    </div>
)


}

export default Card