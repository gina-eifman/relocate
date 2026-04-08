import React from 'react';
import styles from './SearchBar.module.css';
import { KEY_WORDS_ERR } from '../../../utils/constants';
import { useSearchParams } from 'react-router-dom';

function SearchBar(props) {
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = React.useState("");
    const [errMessage, setErrMessage] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    React.useEffect(() => {
        if (!searchParams.get('category')) {
            const savedSearch = localStorage.getItem("search");
            if (savedSearch) {
                setSearchValue(savedSearch);
                setIsValid(savedSearch.trim().length > 0);
        }

        }
    }, []);

    function handleChange(e) {
        const newValue = e.target.value;
        setSearchValue(newValue);
        const valid = newValue.trim().length > 0;
        setIsValid(valid);
        setErrMessage(valid ? "" : KEY_WORDS_ERR);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedValue = searchValue.trim();
        if (trimmedValue === "") {
            setErrMessage(KEY_WORDS_ERR);
            return;
        }
        localStorage.setItem("search", trimmedValue);
        props.onSubmit(trimmedValue);
        setErrMessage("");
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
            <span className={styles.searchbar__error}>{errMessage}</span>
        </section>
    );
}

export default SearchBar;