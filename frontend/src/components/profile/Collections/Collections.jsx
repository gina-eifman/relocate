import React, { useState, useRef } from "react";
import CollectionPopup from "./../CollectionPopup/CollectionPopup";
import styles from "./Collections.module.css";

const Collections = ({
    collections,
    onAddCollection,
    onUpdateCollection,
    onDeleteCollection,
    onAddCountry,
    onRemoveCountry,
    countries
}) => {
    const [selected, setSelected] = useState(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const scrollRef = useRef(null);

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
        await onUpdateCollection(collectionId, updates);
        if (selected && selected._id === collectionId) {
            const updatedCollection = collections.find(c => c._id === collectionId);
            setSelected(updatedCollection);
        }
    };

    const handleCreateNew = () => {
        setIsCreatingNew(true);
    };

    const handleCreateCollection = async (name, countryIds) => {
        await onAddCollection(name, countryIds);
        setIsCreatingNew(false);
    };

    const handleCloseCreate = () => {
        setIsCreatingNew(false);
    };

    return (
        <section className={styles.collections}>
            <div className={styles.collections__header}>
                <button className={styles.collections__arrow} onClick={() => scroll(-1)}>
                    ←
                </button>
                <h2 className={styles.collections__title}>Collections</h2>
                <button className={styles.collections__arrow} onClick={() => scroll(1)}>
                    →
                </button>
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
                                    onDeleteCollection(col._id);
                                }}
                            />
                            <span className={styles.collections__cardName}>{col.name}</span>
                        </div>
                    </div>
                ))}
                <div className={styles.collections__plus} onClick={handleCreateNew}>
                    +
                </div>
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