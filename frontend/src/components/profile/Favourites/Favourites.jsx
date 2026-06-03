import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Favourites.module.css";

const Favourites = ({ countries, liked, toggleFavourite, isLiked, getFavouriteId }) => {
    const scrollRef = useRef(null);

    const favouriteCountries = liked
        .map((fav) => countries.find((c) => c.id === fav.countryId))
        .filter(Boolean);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const cardWidth = 250;
        const gap = 35;
        const scrollAmount = (cardWidth + gap) * direction;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    if (favouriteCountries.length === 0) {
        return (
            <section className={styles.favourites}>
                <div className={styles.favourites__header}>
                    <h2 className={styles.favourites__title}>Favourite countries</h2>
                </div>
                <p className={styles.favourites__empty}>No favourite countries yet.</p>
            </section>
        );
    }

    return (
        <section className={styles.favourites}>
            <div className={styles.favourites__header}>
                <button className={styles.favourites__arrow} onClick={() => scroll(-2)}>
                    ←
                </button>
                <h2 className={styles.favourites__title}>Favourite countries</h2>
                <button className={styles.favourites__arrow} onClick={() => scroll(2)}>
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Favourites;