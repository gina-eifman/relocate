import React, { useState } from 'react';
import styles from './AddCountryPopup.module.css';

const AddCountryPopup = ({ countries, existingIds, onAdd, onClose }) => {
  const [search, setSearch] = useState('');
  const availableCountries = countries.filter(
    c => !existingIds.includes(c.id)
  );

  const filteredCountries = availableCountries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.addpopup__overlay}>
      <div className={styles.addpopup__container}>
        <div className={styles.addpopup__header}>
          <h3 className={styles.addpopup__title}>Add countries</h3>
          <button className={styles.addpopup__close} onClick={onClose}></button>
        </div>
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.addpopup__search}
        />
        <div className={styles.addpopup__list}>
          {filteredCountries.map(country => (
            <div
              key={country.id}
              className={styles.addpopup__item}
              onClick={() => onAdd(country.id)}
            >
              <img src={country.icon} alt={country.name} className={styles.addpopup__icon} />
              <span className={styles.addpopup__name}>{country.name}</span>
            </div>
          ))}
          {filteredCountries.length === 0 && (
            <p className={styles.addpopup__empty}>No countries available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCountryPopup;