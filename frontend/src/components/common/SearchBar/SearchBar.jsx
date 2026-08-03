import React from 'react';
import styles from './SearchBar.module.css';
import { KEY_WORDS_ERR } from '../../../utils/constants';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function SearchBar({onSubmit}) {
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = React.useState("");
    const [error, setError] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);
    
    React.useEffect(() => {
        if (searchParams.get('q')) {
            const savedSearch = searchParams.get('q');
            setSearchValue(savedSearch);
            setIsValid(savedSearch.trim().length > 0);
        } else {
            setSearchValue('');
        }
    }, []);

    function handleChange(e) {
        const newValue = e.target.value;
        setError('');
        setSearchValue(newValue);
        const valid = newValue.trim().length > 0;
        setIsValid(valid);
        setError(valid ? "" : KEY_WORDS_ERR);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedValue = searchValue.trim();
        if (trimmedValue === "") {
            setError(KEY_WORDS_ERR);
            return;
        }
        onSubmit(trimmedValue);
        setError("");
    }

    return(
        <section className={styles.searchbar}>
            <form className={styles.searchbar__form} onSubmit={handleSubmit}>
                <input
                    className={styles.searchbar__input}
                    name='searchValue'
                    type="text"
                    placeholder="find countries..."
                    value={searchValue}
                    onChange={handleChange}
                />
                <button className={styles.searchbar__submit} type="submit" disabled={!isValid}></button>
            </form>
            <ErrorMessage message={error} />
        </section>
    );
}

export default SearchBar;