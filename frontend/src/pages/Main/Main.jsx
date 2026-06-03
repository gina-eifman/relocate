import styles from "./Main.module.css";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useCategories } from '../../hooks/useCategories';
import Loader from "../../components/common/Loader/Loader";

function Main ({isLoading, countries}) {
    const { categories, categoriesLoading } = useCategories();
    const [visibleCount, setVisibleCount] = React.useState(6)
    const visibleCategories = categories.slice(0, visibleCount)
    const navigate = useNavigate();
    
    function handleSearch(query) {
        const exactMatch = countries.find(country => 
            country.name.toLowerCase() === query.toLowerCase()
        );
        if (exactMatch) {
            navigate(`/country/${exactMatch.id}`);
        } else {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    }

    function handleMoreClick() {
        setVisibleCount(prev => prev + 3)
    }

    if (isLoading ) return <Loader />;

    return (
        <main className={styles.main}>
            <h1 className={styles.main__header}>Relocate in comfort</h1>
            <SearchBar onSubmit={handleSearch} />
            <p className={styles.main__text}>
                Do you want to move but don't know which country to choose? 
                On our website, you can learn about the culture, nature, cost of living, 
                digital environment, and more of different countries and find the perfect one for you.
            </p>
            <div className={styles.main__section}>
                <ul className={styles.main__categories}>
                    {visibleCategories.map(category => (
                        <li className={styles.main__category} key={category.id}>
                            <Link to={`/search?category=${category.id}`} className={styles.main__link}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
                { visibleCategories.length < categories.length && (
                    <button className={styles.main__more} onClick={handleMoreClick}>Show more</button>
                )}
            </div>
        </main>
    );
}

export default Main;