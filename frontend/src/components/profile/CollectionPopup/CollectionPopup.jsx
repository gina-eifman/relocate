import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import AddCountryPopup from './../AddCountryPopup/AddCountryPopup';
import styles from './CollectionPopup.module.css';

const CollectionPopup = ({ countries, collection, onClose, onUpdate, onAddCountry, onRemoveCountry, isNew, onCreate }) => {
    // Режим создания
    const [newName, setNewName] = useState('');
    const [newCountryIds, setNewCountryIds] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Режим редактирования существующей коллекции
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(collection?.name || '');
    const [oldData, setOldData] = useState(null);

    // Пагинация
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);

    // Если isNew, используем локальные стейты, иначе данные из collection
    const actualName = isNew ? newName : name;
    const actualCountryIds = isNew ? newCountryIds : (collection?.countryIds || []);
    const actualCountries = actualCountryIds
        .map(id => countries.find(c => c.id === id))
        .filter(Boolean);

    // Определяем количество карточек на страницу в зависимости от ширины окна
    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1200) setItemsPerPage(8);
            else if (width >= 900) setItemsPerPage(6);
            else if (width >= 600) setItemsPerPage(3);
            else setItemsPerPage(2);
        };
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    // Корректируем текущую страницу, если после удаления стран она стала пустой
    useEffect(() => {
        const totalPages = Math.ceil(actualCountries.length / itemsPerPage);
        if (currentPage >= totalPages && totalPages > 0) {
            setCurrentPage(totalPages - 1);
        } else if (actualCountries.length === 0) {
            setCurrentPage(0);
        }
    }, [actualCountries.length, itemsPerPage, currentPage]);

    const totalPages = Math.ceil(actualCountries.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const visibleCountries = actualCountries.slice(startIndex, startIndex + itemsPerPage);

    const goPrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };
    const goNextPage = () => {
        if (currentPage + 1 < totalPages) setCurrentPage(prev => prev + 1);
    };

    // Режим редактирования существующей коллекции
    const handleEdit = () => {
        setOldData({ name, countryIds: collection.countryIds });
        setIsEditing(true);
        setCurrentPage(0);
    };

    const handleCancel = () => {
        setName(oldData.name);
        setIsEditing(false);
        setCurrentPage(0);
    };

    const handleSubmitExisting = async () => {
        setIsSaving(true);
        const updated = await onUpdate(collection._id, { name, countryIds: collection.countryIds });
        if (updated) {
            setName(updated.name);
        }
        setIsSaving(false);
        setIsEditing(false);
        setCurrentPage(0);
        onClose();
    };

    // Режим создания новой коллекции
    const handleCreateSubmit = async () => {
        if (!newName.trim()) return;
        setIsSaving(true);
        await onCreate(newName.trim(), newCountryIds);
        setIsSaving(false);
        onClose();
    };

    const handleAddCountry = async (countryId) => {
        if (isNew) {
            if (!newCountryIds.includes(countryId)) {
                setNewCountryIds(prev => [...prev, countryId]);
            }
        } else {
            await onAddCountry(collection._id, countryId);
            const updatedCountryIds = [...collection.countryIds, countryId];
            await onUpdate(collection._id, { countryIds: updatedCountryIds });
        }
        setShowAddPopup(false);
        const newTotalPages = Math.ceil((actualCountryIds.length + 1) / itemsPerPage);
        setCurrentPage(newTotalPages - 1);
    };

    const handleRemoveCountry = (countryId) => {
        console.log('=== handleRemoveCountry ===');
        console.log('isNew:', isNew);
        console.log('collection._id:', collection?._id);
        console.log('countryId:', countryId);
        
        if (isNew) {
            setNewCountryIds(prev => prev.filter(id => id !== countryId));
        } else {
            console.log('Вызываем onRemoveCountry с', collection._id, countryId);
            onRemoveCountry(collection._id, countryId);
        }
    };

    const renderContent = () => {
        if (isNew) {
            return (
                <>
                    <div className={styles.popup__header}>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className={styles.popup__input}
                            placeholder="Collection name"
                            autoFocus
                        />
                        <button className={styles.popup__close} onClick={onClose}></button>
                    </div>
                    <div className={styles.popup__grid}>
                        {visibleCountries.map(country => (
                            <div key={country.id} className={styles.popup__card}>
                                <div
                                    className={styles.popup__image}
                                    style={{ backgroundImage: `url(${country.backgroundImage})` }}
                                >
                                    <div className={styles.popup__darklay}></div>
                                    <button
                                        className={styles.popup__delete}
                                        onClick={() => handleRemoveCountry(country.id)}
                                    ></button>
                                    <span className={`${styles.popup__countryName} ${styles.popup__countryName_editing}`}>
                                        {country.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className={styles.popup__plus} onClick={() => setShowAddPopup(true)}>+</div>
                    </div>
                    {totalPages > 1 && (
                        <div className={styles.popup__pagination}>
                            <button className={styles.popup__paginationArrow} onClick={goPrevPage} disabled={currentPage === 0}>←</button>
                            <span className={styles.popup__paginationInfo}>{currentPage + 1} / {totalPages}</span>
                            <button className={styles.popup__paginationArrow} onClick={goNextPage} disabled={currentPage + 1 === totalPages}>→</button>
                        </div>
                    )}
                    <div className={styles.popup__actions}>
                        <button
                            type="submit"
                            disabled={isSaving || !newName.trim()}
                            onClick={handleCreateSubmit}
                            className={`${styles.popup__button} ${isSaving ? styles.popup__button_saving : ''}`}
                        >
                            {isSaving ? 'Creating...' : 'Create collection'}
                        </button>
                        <button
                            className={`${styles.popup__button} ${styles.popup__button_cancel}`}
                            disabled={isSaving}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            );
        }

        // Существующая коллекция
        const isEditingMode = isEditing;
        const displayName = isEditingMode ? name : collection.name;
        return (
            <>
                <div className={styles.popup__header}>
                    {isEditingMode ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.popup__input}
                            autoFocus
                        />
                    ) : (
                        <h2 className={styles.popup__title}>{displayName}</h2>
                    )}
                    <button className={styles.popup__close} onClick={onClose}></button>
                </div>
                <div className={styles.popup__grid}>
                    {visibleCountries.map(country => (
                        <div key={country.id} className={styles.popup__card}>
                            <div
                                className={styles.popup__image}
                                style={{ backgroundImage: `url(${country.backgroundImage})` }}
                            >
                                <div className={styles.popup__darklay}></div>
                                {false && (
                                    <button
                                        className={styles.popup__delete}
                                        onClick={() => handleRemoveCountry(country.id)}
                                    ></button>
                                )}
                                {!isEditingMode ? (
                                    <Link to={`/country/${country.id}`} className={styles.popup__countryName}>
                                        {country.name}
                                    </Link>
                                ) : (
                                    <span className={`${styles.popup__countryName} ${styles.popup__countryName_editing}`}>
                                        {country.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {false && (
                        <div className={styles.popup__plus} onClick={() => setShowAddPopup(true)}>+</div>
                    )}
                </div>
                {totalPages > 1 && (
                    <div className={styles.popup__pagination}>
                        <button className={styles.popup__paginationArrow} onClick={goPrevPage} disabled={currentPage === 0}>←</button>
                        <span className={styles.popup__paginationInfo}>{currentPage + 1} / {totalPages}</span>
                        <button className={styles.popup__paginationArrow} onClick={goNextPage} disabled={currentPage + 1 === totalPages}>→</button>
                    </div>
                )}
                {isEditingMode ? (
                    <div className={styles.popup__actions}>
                        <button
                            type="submit"
                            disabled={isSaving}
                            onClick={handleSubmitExisting}
                            className={`${styles.popup__button} ${isSaving ? styles.popup__button_saving : ''}`}
                        >
                            {isSaving ? 'Saving...' : 'Save changes'}
                        </button>
                        <button
                            className={`${styles.popup__button} ${styles.popup__button_cancel}`}
                            disabled={isSaving}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button type="button" className={`${styles.popup__button} ${styles.popup__button_edit}`} onClick={handleEdit}>
                        Edit
                    </button>
                )}
            </>
        );
    };

    return ReactDOM.createPortal(
        <div className={styles.popup__overlay}>
            <div className={styles.popup__container}>
                {renderContent()}
            </div>
            {showAddPopup && (
                <AddCountryPopup
                    countries={countries}
                    existingIds={actualCountryIds}
                    onAdd={handleAddCountry}
                    onClose={() => setShowAddPopup(false)}
                />
            )}
        </div>,
        document.body
    );
};

export default CollectionPopup;