import React from 'react';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import CountryCard from '../../components/country/CountryCard/CountryCard';
import styles from './SearchResults.module.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavourites';

function SearchResults(props) {
    const { isLiked, toggleFavorite, getFavoriteId } = useFavorites();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const [visibleCount, setVisibleCount] = React.useState(6);
    const navigate = useNavigate();
    let filteredCountries = props.countries;

    if (query) {
        filteredCountries = filteredCountries.filter(country => 
            country.name.toLowerCase().includes(query.toLowerCase()) ||
            country.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
        );
    }
    if (category && category !== 'all-countries') {
        filteredCountries = filteredCountries.filter(country => 
            country.categories?.includes(category)
        );
    }

    const visibleCountries = filteredCountries.slice(0, visibleCount);

    function handleSearch(query) {
        const exactMatch = props.countries.find(country => 
            country.name.toLowerCase() === query.toLowerCase()
        );
        if (exactMatch) {
            navigate(`/country/${exactMatch.id}`);
        } else {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    }    

    function handleMoreClick() {
        setVisibleCount(prev => prev + 6);
    }

    let displayTitle = "All countries";
    if (category) {
        const categoryNames = {
            'easy-citizenship': 'Easy to get citizenship',
            'warm-climate': 'Warm climate',
            'cheap': 'Cheap countries',
            'high-standard': 'High standard of living',
            'developed-infrastructure': 'Developed infrastructure',
            'safe': 'Safe countries',
            'digital': 'Digital countries',
            'eco-friendly': 'Eco-friendly countries',
            'mountains': 'Mountains & fjords',
            'coastal-living': 'Coastal living'
        };
        displayTitle = categoryNames[category] || category;
    } else if (query) {
        displayTitle = `Search results for ${query}`;
    }

    return(
        <>
        {filteredCountries.length === 0 ? (
            <section className={styles.results_empty}>
                <p className={styles.results__header_empty}>No results found.</p>
                <p className={styles.results__text_empty}>Want to return to the
                    <Link to='/' className={styles.results__link_empty}>main</Link>?
                </p>
            </section>
        ) : (
            <section className={styles.results}>
                <SearchBar onSubmit={handleSearch} />
                <h1 className={styles.results__header}>{displayTitle}</h1>
                <ul className={styles.results__cards}>
                    {visibleCountries.map(country => (
                        <li className={styles.results__element} key={country.id}>
                            <CountryCard country={country} isLiked={isLiked(country.id)} 
                            onLike={() => toggleFavorite(country.id, isLiked(country.id), 
                            getFavoriteId(country.id) )} />
                        </li>
                    ))}
                </ul>
                {visibleCountries.length < filteredCountries.length && (
                    <button className={styles.results__more} onClick={handleMoreClick}>
                        Show more
                    </button>
                )}
            </section>
        )}
        </>
    );
}

export default SearchResults;