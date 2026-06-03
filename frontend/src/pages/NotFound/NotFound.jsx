import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'

function NotFound() {
    return(
        <section className={styles.notfound}>
            <h1 className={styles.notfound__header}>404</h1>
            <p className={styles.notfound__text}>
                The page was not found. Let's go to the <Link to="/" className={styles.notfound__link}>main</Link>.
            </p>
        </section>
    )
}

export default NotFound;