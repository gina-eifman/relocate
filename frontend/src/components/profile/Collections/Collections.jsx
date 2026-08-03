import React, { useState, useRef, useEffect } from "react";
import CollectionPopup from "./../CollectionPopup/CollectionPopup";
import styles from "./Collections.module.css";
import { Link } from "react-router-dom";

const Collections = ({
    collections,
    onAddCollection,
    onUpdateCollection,
    onDeleteCollection,
    onAddCountry,
    onRemoveCountry,
    countries,
    errMessage
}) => {
    const [selected, setSelected] = useState(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [errors, setErrors] = useState('');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef(null);

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
    }, [collections]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const cardWidth = 350;
        const gap = 50;
        const scrollAmount = (cardWidth + gap) * direction;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const getCollectionBackground = (collection) => {
        if (!collection.countryIds || collection.countryIds.length === 0) {
            return "url(/images/collection_default.jpg)";
        }
        const lastCountryId = collection.countryIds[collection.countryIds.length - 1];
        const country = countries.find(c => c.id === lastCountryId);
        return country ? `url(${country.backgroundImage})` : "url(/images/collection_default.jpg)";
    };

    const handleUpdateCollection = async (collectionId, updates) => {
        try {
            await onUpdateCollection(collectionId, updates);
            setErrors('');
            if (selected && selected._id === collectionId) {
                const updatedCollection = collections.find(c => c._id === collectionId);
                setSelected(updatedCollection);
            }
        } catch (error) {
            setErrors(errMessage);
        }
    };

    const handleCreateNew = () => {
        setIsCreatingNew(true);
    };

    const handleCreateCollection = async (name, countryIds) => {
        try {
            await onAddCollection(name, countryIds);
            setIsCreatingNew(false);
            setErrors('');
        } catch (error) {
            setErrors(errMessage);
        }
    };

    const handleDeleteCollection = async (collectionId) => {
        try {
            await onDeleteCollection(collectionId);
            setErrors({});
            if (selected && selected._id === collectionId) {
                setSelected(null);
            }
        } catch (err) {
            console.error('Delete error:', err);
            setErrors({ general: err.message });
        }
    };

    const handleCloseCreate = () => {
        setIsCreatingNew(false);
    };

    return (
        <section className={styles.collections}>
            <div className={styles.collections__header}>
                {collections.length === 0 ? 
                        <h2 className={styles.collections__title}>Collections</h2> : 
                    <>
                        <button 
                            className={`${styles.collections__arrow} ${!canScrollLeft ? styles.collections__arrow_disabled : ''}`}
                            onClick={() => scroll(-1)}
                            disabled={!canScrollLeft}
                        >
                            ←
                        </button>
                        <h2 className={styles.collections__title}>Collections</h2>
                        <button 
                            className={`${styles.collections__arrow} ${!canScrollRight ? styles.collections__arrow_disabled : ''}`}
                            onClick={() => scroll(1)}
                            disabled={!canScrollRight}
                        >
                            →
                        </button>
                    
                    </>
                }
            </div>
            <div className={styles.collections__scroll} ref={scrollRef}>
                {collections.map((col) => (
                    <div
                        key={col._id}
                        className={styles.collections__card}
                        onClick={() => setSelected(col)}
                    >
                        <div
                            className={styles.collections__cardImage}
                            style={{ backgroundImage: getCollectionBackground(col) }}
                        >
                            <div className={styles.collections__overlay}></div>
                            <button
                                className={styles.collections__delete}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCollection(col._id);
                                }}
                            />
                            <span className={styles.collections__cardName}>{col.name}</span>
                        </div>
                    </div>
                ))}
                {collections.length === 0 ?
                    <p className={styles.collections__empty}>
                        No collections yet. Create your first <Link className={styles.collections__link} onClick={handleCreateNew}>collection</Link>!</p> :
                    <div className={styles.collections__plus} onClick={handleCreateNew}>
                        +
                    </div>
                }
            </div>
            {selected && (
                <CollectionPopup
                    countries={countries}
                    collection={selected}
                    onClose={() => setSelected(null)}
                    onUpdate={handleUpdateCollection}
                    onAddCountry={onAddCountry}
                    onRemoveCountry={onRemoveCountry}
                />
            )}
            {isCreatingNew && (
                <CollectionPopup
                    countries={countries}
                    isNew={true}
                    onClose={handleCloseCreate}
                    onCreate={handleCreateCollection}
                />
            )}
        </section>
    );
};

export default Collections;