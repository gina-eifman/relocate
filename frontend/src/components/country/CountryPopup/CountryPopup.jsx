import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryPopup.module.css';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';

const CountryPopup = ({ collections, countryId, onAdd, onRemove, onClose, anchorRef, errMessage }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [error, setError] = useState('');
    const popupRef = useRef(null);

    const updatePosition = () => {
        if (anchorRef && anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                setPosition({
                    top: rect.bottom + window.scrollY + 20,
                    left: rect.left + window.scrollX,
                });
            } else {
                setPosition({
                    top: rect.top + window.scrollY,
                    left: rect.right + window.scrollX + 20,
                });
            }
        }
    };

    useEffect(() => {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [anchorRef]);

    // Закрытие по клику вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && anchorRef?.current && !anchorRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose, anchorRef]);

    const handleCheckboxChange = (collection, isChecked) => {
        if (isChecked) {
            try {
                onAdd(collection._id, countryId);
                setError('');
            } catch (error) {
                setError(errMessage);
            }
        } else {
            try {
                onRemove(collection._id, countryId);
                setError('');
            } catch (error) {
                setError(errMessage);
            }
        }
    };

    return (
        <div
            ref={popupRef}
            className={styles.popup}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
            }}
        >
            <div className={styles.popup__container}>
                <div className={styles.popup__header}>
                    <h3 className={styles.popup__title}>Choose collection</h3>
                    <button className={styles.popup__close} onClick={onClose}></button>
                </div>
                <div className={styles.collections}>
                    {collections.length === 0 && (
                        <p className={styles.collections__empty}>No collections yet. Create one in your <Link className={styles.collections__link} to='/profile'>profile</Link>.</p>
                    )}
                    {collections.map(collection => {
                        const isChecked = collection.countryIds.includes(countryId);
                        return (
                            <label key={collection._id} className={styles.collections__item}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => handleCheckboxChange(collection, e.target.checked)}
                                    className={styles.collections__checkbox}
                                />
                                <span className={styles.collections__name}>{collection.name}</span>
                            </label>
                        );
                    })}
                </div>
                <ErrorMessage message={error} />
            </div>
        </div>
    );
};

export default CountryPopup;