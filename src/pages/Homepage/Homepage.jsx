import styles from './Homepage.module.css'

function Homepage () {
    return (
        <div className={`px-md-5 ${styles.container}`} >
            <h1 className={styles.title}>Boas-Vindas ao Descriptum!</h1>
            <div className={styles.textContainer}>
                <p className={styles.mainText}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia adipisci est vitae placeat nobis corrupti omnis magni aspernatur autem tenetur.
                </p>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas numquam alias sed culpa perspiciatis natus quis voluptate, repudiandae at distinctio accusantium nisi architecto impedit voluptatibus. Fugit tempora dolore dignissimos nobis rerum modi aspernatur vero maiores expedita rem, nesciunt veritatis velit!
                </p>
            </div>

            <div className={styles.buttonsContainer}>
                {/* O outro botão virá assim (precisa do componente de Botão) */}
                {/* <a href="" className={styles.userGuideBtn} style={{backgroundColor: 'var(--base-royal)', flexGrow: 1}}>Começar a Extrair</a> */}
                <a href="" className={styles.userGuideBtn}>Ver Guia de Uso</a>
            </div>
        </div>
    )
}

export default Homepage