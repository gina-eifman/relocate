import React from "react"
import { favorites } from "../services/favorites";

export const useFavorites = () => {
    const [liked, setLiked] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        setIsLoading(true);
        try {
            /*const data = await favorites.getFavorites();*/
            setLiked([] /*data */);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFavorite = async (countryId, isCurrentlyLiked, favoriteId) => {
        if (isCurrentlyLiked) {
            setLiked(prev => prev.filter(fav => fav.countryId !== countryId));
            try {
                /*await favorites.removeFavorite(favoriteId);*/
            } catch {
                /*await loadFavorites();*/
            }
        } else {
            const newLiked = { countryId, id: 'newLiked' };
            setLiked(prev => [...prev, newLiked]);
            try {
                /*const newFavorite = await favorites.addFavorite(countryId);*/
                setLiked(prev => prev.map(fav => 
                    fav.id === 'newLiked' ? newFavorite : fav
                ));
            } catch {
                /*await loadFavorites();*/
            }
        }
    };

    const isLiked = (countryId) => {
        return liked.some(fav => fav.countryId === countryId);
    };

    const getFavoriteId = (countryId) => {
        return liked.find(fav => fav.countryId === countryId)?.id;
    };

    return { liked, isLoading, toggleFavorite, isLiked, getFavoriteId };

}