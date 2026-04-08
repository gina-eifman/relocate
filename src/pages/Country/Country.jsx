import { useParams } from 'react-router-dom';
import styles from './Country.module.css';
import { useCountry } from "../../hooks/useCountry.js";
import { useFavorites } from "../../hooks/useFavourites.js";
import CountryAccordion from '../../components/country/CountryAccordion/CountryAccordion.jsx';
import Loader from '../../components/common/Loader/Loader.jsx';
import React from 'react';

function Country() {
    const { id } = useParams();
    const { countryData, isLoading } = useCountry(id);
    const { isLiked, toggleFavorite, getFavoriteId } = useFavorites();
    const [openSectionIndex, setOpenSectionIndex] = React.useState(null);
    const handleToggle = (index) => {
        setOpenSectionIndex(openSectionIndex === index ? null : index);
    };
    
    if (isLoading || !countryData) return <Loader />;
    
    return(
        <section className={styles.country} style={{ backgroundImage: `url(${countryData.backgroundImage})` }}>
            <div className={styles.country__flexbox}>
                <h1 className={styles.country__header}>{countryData.name}</h1>
                <button className={`${styles.country__icon} ${isLiked(countryData.id) && styles.country__icon_active}`} 
                onClick={() => toggleFavorite(countryData.id, isLiked(countryData.id), getFavoriteId(countryData.id))}></button>
            </div>
            <div className={styles.country__container}>
                {countryData.sections?.map((section, index) => (
                    <CountryAccordion key={index} title={section.title} items={section.items}
                    isOpen={openSectionIndex === index} onToggle={() => handleToggle(index)} />
                ))}
            </div>
            {<button className={`${styles.country__button} ${isLoading && styles.country__button_loading} ${isLiked(countryData.id) && styles.country__button_active}`} 
                onClick={() => toggleFavorite(countryData.id, isLiked(countryData.id), getFavoriteId(countryData.id))}>
                    {isLiked ? 'Add to favourites' : isLoading ? 'Adding to favourites' : 'Added to favourites'}
            </button>}
        </section>
    );
}

export default Country;