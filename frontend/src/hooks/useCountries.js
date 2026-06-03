import React from 'react';
import { countriesAPI } from '../services/countries';

export const useCountries = () => {
    const [countries, setCountries] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        setIsLoading(true);
        try {
            const data = await countriesAPI.getAllCountries();
            setCountries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { countries, isLoading, refetch: loadCountries };
};