import { useParams } from 'react-router-dom';
import styles from './Country.module.css';
import { useCountry } from "../../hooks/useCountry.js";
import { useFavourites } from "../../hooks/useFavourites.js";
import { useAuth } from "../../hooks/useAuth.js";
import CountryAccordion from '../../components/country/CountryAccordion/CountryAccordion.jsx';
import Loader from '../../components/common/Loader/Loader.jsx';
import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CountryPopup from '../../components/country/CountryPopup/CountryPopup.jsx';
import { useCollections } from '../../hooks/useCollections.js';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage.jsx';

function Country({ isLoading, errMessageCollections, errMessageFavourites }) {
    const { id } = useParams();
    const { countryData } = useCountry(id);
    const { isLiked, toggleFavourite, getFavouriteId } = useFavourites();
    const { collections, addCountryToCollection, removeCountryFromCollection } = useCollections();
    const { isLoggedIn } = useAuth();
    const [openSectionIndex, setOpenSectionIndex] = React.useState(null);
    const [showCollectionsPopup, setShowCollectionsPopup] = React.useState(false);
    const [buttonState, setButtonState] = React.useState('idle');
    const navigate = useNavigate();
    const location = useLocation();
    const buttonRef = useRef(null);
    const [errors, setErrors] = React.useState(null);
    let timeoutId = null;

    const handleToggle = (index) => {
        setErrors(prev => ({ ...prev, collections: null}));
        setOpenSectionIndex(openSectionIndex === index ? null : index);
    };

    const handleLike = async () => {
        try {
            await toggleFavourite(countryData.id, getFavouriteId(countryData.id));
            setErrors(prev => ({ ...prev, favourites: null }));
        } catch (err) {
            console.error(err);
            setErrors(prev => ({ ...prev, favourites: errMessageFavourites }));
        }
    };

    const handleAddToCollectionClick = () => {
        setOpenSectionIndex(null);
        setShowCollectionsPopup(true);
    };

    const handleCollectionAdd = async (collectionId, countryId) => {
        setButtonState('adding');
        try {
            await addCountryToCollection(collectionId, countryId);
            if (buttonState !== 'added') {
                setButtonState('added');
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setButtonState('idle');
                }, 3000);
            }
            setErrors(prev => ({ ...prev, collections: null }));
        } catch (err) {
            console.error(err);
            setErrors(prev => ({ ...prev, collections: errMessageCollections}));
            setButtonState('idle');
        }
    };

    const handleCollectionRemove = async (collectionId, countryId) => {
        try {
            await removeCountryFromCollection(collectionId, countryId);
            setErrors(prev => ({ ...prev, collections: null }));
        } catch (err) {
            console.error(err);
            setErrors(prev => ({ ...prev, collections: errMessageCollections}));
        }
    };

    React.useEffect(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    React.useEffect(() => {
        if (countryData?.backgroundImage) {
            document.body.style.background = `url(${countryData.backgroundImage}) top/cover no-repeat`;
        }
        return () => {};
    }, [countryData]);

    if (isLoading || !countryData) return <Loader />;

    const getButtonText = () => {
        if (buttonState === 'adding') return 'Adding to collection';
        if (buttonState === 'added') return 'Added to collection';
        return 'Add to collection';
    };

    return (
        <section className={styles.country} style={{ backgroundImage: `url(${countryData.backgroundImage})` }}>
            <div className={styles.country__flexbox}>
                <h1 className={styles.country__header}>{countryData.name}</h1>
                {isLoggedIn && <button
                    className={`${styles.country__icon} ${isLiked(countryData.id) && styles.country__icon_active}`}
                    onClick={handleLike}
                />}
            </div>
            <ErrorMessage message={errors?.favourites} />
            <div className={styles.country__container}>
                {countryData.sections?.map((section, index) => (
                    <CountryAccordion
                        key={index}
                        title={section.title}
                        items={section.items}
                        isOpen={openSectionIndex === index}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </div>
            <button
                className={`${styles.country__button} ${buttonState === 'adding' ? styles.country__button_loading : ''} ${buttonState === 'added' ? styles.country__button_active : ''}`}
                onClick={handleAddToCollectionClick}
                disabled={buttonState !== 'idle'}
                ref={buttonRef}
            >
                {getButtonText()}
            </button>

            {showCollectionsPopup && (
                <CountryPopup
                    collections={collections}
                    countryId={id}
                    onAdd={handleCollectionAdd}
                    onRemove={handleCollectionRemove}
                    onClose={() => setShowCollectionsPopup(false)}
                    anchorRef={buttonRef}
                    showCollectionsPopup={showCollectionsPopup}
                    errMessage={errors?.collections}
                />
            )}
        </section>
    );
}

export default Country;