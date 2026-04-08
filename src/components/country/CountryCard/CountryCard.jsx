import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

function CountryCard(props) {
    return(
        <div className={styles.card}>
            <img src={props.country.icon} className={styles.card__image} alt='country image' />
            <div className={styles.card__container}>
                <Link to={`/country/${props.country.id}`} className={styles.card__header}>{props.country.name}</Link>
                <button className={`${styles.card__button} ${props.isLiked ? styles.card__button_active : ""}`} 
                onClick={props.onLike}></button>
            </div>
            <p className={styles.card__text}>{props.country.shortDescription}</p>
        </div>
    )
}

export default CountryCard;