import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Favourites.module.css";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";

const Favourites = ({ countries, liked, toggleFavourite, isLiked, getFavouriteId, errMessage }) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef(null);

    const favouriteCountries = liked
        .map((fav) => countries.find((c) => c.id === fav.countryId))
        .filter(Boolean);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 1);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    useEffect(() => {
        checkScroll();
        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            return () => {
                ref.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [favouriteCountries]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const cardWidth = 250;
        const gap = 35;
        const scrollAmount = (cardWidth + gap) * direction;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    if (!favouriteCountries || favouriteCountries.length === 0) {
        return (
            <section className={styles.favourites}>
                <div className={styles.favourites__header}>
                    <h2 className={styles.favourites__title}>Favourite countries</h2>
                </div>
                {!favouriteCountries ? 
                    <p className={styles.favourites__empty}>Failed to load favourite countries. Please reload page.</p> :
                    <p className={styles.favourites__empty}>No favourites yet. 
                        Explore some <Link className={styles.favourites__link} to="/">countries</Link> you like!
                    </p>
                }              
                
            </section>
        );
    }

    return (
        <section className={styles.favourites}>
            <div className={styles.favourites__header}>
                <button 
                    className={`${styles.favourites__arrow} ${!canScrollLeft ? styles.favourites__arrow_disabled : ''}`}
                    onClick={() => scroll(-2)}
                    disabled={!canScrollLeft}
                >
                    ←
                </button>
                <h2 className={styles.favourites__title}>Favourite countries</h2>
                <button 
                    className={`${styles.favourites__arrow} ${!canScrollRight ? styles.favourites__arrow_disabled : ''}`}
                    onClick={() => scroll(2)}
                    disabled={!canScrollRight}
                >
                    →
                </button>
            </div>
            <div className={styles.favourites__scroll} ref={scrollRef}>
                <div className={styles.favourites__grid}>
                    {favouriteCountries.map((country) => {
                        const favouriteId = getFavouriteId(country.id);
                        return (
                            <div key={country.id} className={styles.favourites__card}>
                                <div
                                    className={styles.favourites__image}
                                    style={{ backgroundImage: `url(${country.backgroundImage})` }}
                                >
                                    <div className={styles.favourites__overlay}></div>
                                    <button
                                        className={styles.favourites__delete}
                                        onClick={() => toggleFavourite(country.id, favouriteId)}
                                    />
                                    <Link to={`/country/${country.id}`} className={styles.favourites__name}>
                                        {country.name}
                                    </Link>
                                </div>
                                <ErrorMessage message={errMessage} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Favourites;