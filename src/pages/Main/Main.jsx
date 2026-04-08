import styles from "./Main.module.css";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { ALL_COUNTRIES } from "../../utils/constants";

function Main () {
    const [visibleCount, setVisibleCount] = React.useState(6)
    const categories = [
        { name: 'All countries', id: 'all-countries', link: '/search' },
        { name: 'Easy to get citizenship', id: 'easy-citizenship', link: '/search?category=easy-citizenship' },
        { name: 'Warm climate', id: 'warm-climate', link: '/search?category=warm-climate' },
        { name: 'Cheap countries', id: 'cheap', link: '/search?category=cheap' },
        { name: 'High standard of living', id: 'high-standard', link: '/search?category=high-standard' },
        { name: 'Developed infrastructure', id: 'developed-infrastructure', link: '/search?category=developed-infrastructure' },
        { name: 'Safe countries', id: 'safe', link: '/search?category=safe' },
        { name: 'Digital countries', id: 'digital', link: '/search?category=digital' },
        { name: 'Eco-friendly countries', id: 'eco-friendly', link: '/search?category=eco-friendly' },
        { name: 'Mountains & fjords', id: 'mountains', link: '/search?category=mountains' },
        { name: 'Coastal living', id: 'coastal-living', link: '/search?category=coastal-living' }
    ]
    const visibleCategories = categories.slice(0, visibleCount)
    const navigate = useNavigate();
    const countries = ALL_COUNTRIES /* в будущем бери из бд */
    
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
                            <Link to={category.link} className={styles.main__link}>{category.name}</Link>
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