import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';

function CountryCard({isLoggedIn,  country, isLiked, onLike, errMessage}) {
    return(
        <div className={styles.card}>
            <img src={country.icon} className={styles.card__image} alt='country image' />
            <div className={styles.card__container}>
                <Link to={`/country/${country.id}`} className={styles.card__header}>{country.name}</Link>
                {isLoggedIn && (
                    <button 
                        className={`${styles.card__button} ${isLiked ? styles.card__button_active : ""}`}
                        onClick={onLike}></button>
                )}
            </div>
            <p className={styles.card__text}>{country.shortDescription}</p>
            <ErrorMessage message={errMessage} />
        </div>
    )
}

export default CountryCard;