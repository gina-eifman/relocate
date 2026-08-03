import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import AddCountryPopup from './../AddCountryPopup/AddCountryPopup';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
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
    const [editingCountryIds, setEditingCountryIds] = useState([]); // локальный список стран

    // Пагинация
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);

    // Ошибки
    const [errors, setErrors] = useState({});

    // Определяем актуальный список стран для отображения
    const actualCountryIds = isNew
        ? newCountryIds
        : isEditing
        ? editingCountryIds
        : (collection?.countryIds || []);

    const actualCountries = actualCountryIds
        .map(id => countries.find(c => c.id === id))
        .filter(Boolean);

    // Определяем количество карточек на страницу в зависимости от ширины окна
    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1400) setItemsPerPage(8);
            else if (width >= 1024) setItemsPerPage(6);
            else if (width >= 768) setItemsPerPage(4);
            else if (width >= 660) setItemsPerPage(2);
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
        setOldData({ name: collection.name, countryIds: [...collection.countryIds] });
        setName(collection.name);
        setEditingCountryIds([...collection.countryIds]); // копируем для локального редактирования
        setIsEditing(true);
        setCurrentPage(0);
        setErrors({});
    };

    const handleCancel = () => {
        if (oldData) {
            setName(oldData.name);
            setEditingCountryIds(oldData.countryIds);
        }
        setIsEditing(false);
        setCurrentPage(0);
        setErrors({});
    };

    const handleSubmitExisting = async () => {
        setErrors({});
        if (!name.trim()) {
            setErrors({ name: 'Collection name cannot be empty.' });
            return;
        }
        setIsSaving(true);
        try {
            // Отправляем финальные данные (название и обновлённый список стран)
            const updated = await onUpdate(collection._id, { name, countryIds: editingCountryIds });
            if (updated) {
                setName(updated.name);
            }
            setIsEditing(false);
            setCurrentPage(0);
            onClose();
        } catch (err) {
            console.error('Update error:', err);
            setErrors({ general: err.message });
        } finally {
            setIsSaving(false);
        }
    };

    // Режим создания новой коллекции
    const handleCreateSubmit = async () => {
        setErrors({});
        setIsSaving(true);
        try {
            await onCreate(newName.trim(), newCountryIds);
            onClose();
        } catch (err) {
            console.error('Create error:', err);
            setErrors({ general: err.message });
        } finally {
            setIsSaving(false);
        }
    };

    // Добавление страны (локально, без запроса)
    const handleAddCountry = (countryId) => {
        setErrors(prev => ({ ...prev, general: '' }));
        try {
            if (isNew) {
                if (!newCountryIds.includes(countryId)) {
                    setNewCountryIds(prev => [...prev, countryId]);
                }
            } else {
                // Добавляем в локальный стейт, если ещё нет
                if (!editingCountryIds.includes(countryId)) {
                    setEditingCountryIds(prev => [...prev, countryId]);
                }
            }
            setShowAddPopup(false);
            const newTotalPages = Math.ceil((actualCountryIds.length + 1) / itemsPerPage);
            setCurrentPage(newTotalPages - 1);
        } catch (err) {
            console.error('Add country error:', err);
            setErrors({ general: err.message });
        }
    };

    // Удаление страны (локально, без запроса)
    const handleRemoveCountry = (countryId) => {
        setErrors(prev => ({ ...prev, general: '' }));
        try {
            if (isNew) {
                setNewCountryIds(prev => prev.filter(id => id !== countryId));
            } else {
                setEditingCountryIds(prev => prev.filter(id => id !== countryId));
            }
        } catch (err) {
            console.error('Remove country error:', err);
            setErrors({ general: err.message });
        }
    };

    // Обработчики изменения полей названия
    const handleNameChange = (e, setter) => {
        const value = e.target.value;
        setter(value);
        setErrors(prev => ({ ...prev, name: '' }));
    };

    // Рендер содержимого
    const renderContent = () => {
        if (isNew) {
            return (
                <>
                    <div className={styles.popup__header}>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => handleNameChange(e, setNewName)}
                            className={styles.popup__input}
                            placeholder="Collection name"
                            autoFocus
                        />
                        <button className={styles.popup__close} onClick={onClose}></button>
                    </div>
                    <ErrorMessage message={errors.name} />
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
                        {totalPages === 0 || currentPage === totalPages - 1 ? 
                            <div className={styles.popup__plus} onClick={() => setShowAddPopup(true)}>+</div> 
                            : <></>
                        }
                    </div>
                    {totalPages > 1 && (
                        <div className={styles.popup__pagination}>
                            <button className={styles.popup__arrow} onClick={goPrevPage} disabled={currentPage === 0}>←</button>
                            <span className={styles.popup__pages}>{currentPage + 1} / {totalPages}</span>
                            <button className={styles.popup__arrow} onClick={goNextPage} disabled={currentPage + 1 === totalPages}>→</button>
                        </div>
                    )}
                    <ErrorMessage message={errors.general} />
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
                            onChange={(e) => handleNameChange(e, setName)}
                            className={styles.popup__input}
                            autoFocus
                        />
                    ) : (
                        <h2 className={styles.popup__input + ' ' + styles.popup__input_disabled}>{displayName}</h2>
                    )}
                    <button className={styles.popup__close} onClick={onClose}></button>
                </div>
                <ErrorMessage message={errors.name} />
                <div className={styles.popup__grid}>
                    {visibleCountries.map(country => (
                        <div key={country.id} className={styles.popup__card}>
                            <div
                                className={styles.popup__image}
                                style={{ backgroundImage: `url(${country.backgroundImage})` }}
                            >
                                <div className={styles.popup__darklay}></div>
                                {isEditingMode && (
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
                    {isEditingMode && (totalPages === 0 || currentPage === totalPages - 1) ? 
                        <div className={styles.popup__plus} onClick={() => setShowAddPopup(true)}>+</div> 
                        : <></>
                    }
                </div>
                {totalPages > 1 && (
                    <div className={styles.popup__pagination}>
                        <button className={styles.popup__arrow} onClick={goPrevPage} disabled={currentPage === 0}>←</button>
                        <span className={styles.popup__pages}>{currentPage + 1} / {totalPages}</span>
                        <button className={styles.popup__arrow} onClick={goNextPage} disabled={currentPage + 1 === totalPages}>→</button>
                    </div>
                )}
                <ErrorMessage message={errors.general} />
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