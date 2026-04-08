import React from 'react';
import { country } from "../services/country";

export const useCountry = (id) => {
    const [countryData, setCountryData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false)
    
    React.useEffect(() => {
        if (id) {
            loadCountry(id);
        }
    }, [id]);
    
    const loadCountry = async(id) => {
        setIsLoading(true);
        try {
            const data = await country.getCountry(id);
            setCountryData(data)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return { countryData, isLoading };
}