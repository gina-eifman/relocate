import styles from './Loader.module.css';
import loaderIcon from './../../../images/loading.svg'

function Loader() {
    return(
        <div className={styles.loader}>
            <div className={styles.clouds}>
                <div className={`${styles.cloud} ${styles.cloud_small}`}></div>
                <div className={`${styles.cloud} ${styles.cloud_medium}`}></div>
                <div className={`${styles.cloud} ${styles.cloud_large}`}></div>
            </div>
            <img className={styles.loader__icon} src={loaderIcon} alt='loading..'/>
            <h1 className={styles.loader__header}>Loading</h1>
            <div className={styles.ground}></div>
        </div>
    )
}

export default Loader;